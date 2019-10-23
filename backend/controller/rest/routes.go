package rest

import (
	"aws-budgets/backend/model"
	"encoding/json"
	"io"
	"io/ioutil"
	"net/http"
)

const byteLimit int64 = 1048576

type route struct {
	name    string
	method      string
	pattern     string
	handlerFunc http.HandlerFunc
}

type routes []route

func initRoutes(
	getBudgets func() (model.Budgets, error),
	updateBudgets func(model.Budgets) error,
) routes {
	return routes{
		route{`Get account budgets`, `GET`, `/accountbudgets`, getAccountBudgetsHandler(getBudgets)},
		route{`Update account budgets`, `PUT`, `/updateaccountbudgets`, updateAccountBudgetsHandler(updateBudgets)},
	}
}

func getAccountBudgetsHandler(getBudgets func() (model.Budgets, error)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		accountBudgets, err := getBudgets()
		if err != nil {
			sendServerError(w, r, err)
			return
		}
		sendResponse(w, r, accountBudgets, http.StatusOK)
	}
}

func updateAccountBudgetsHandler(updateBudgets func(model.Budgets) error) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := ioutil.ReadAll(io.LimitReader(r.Body, byteLimit))
		if err != nil {
			sendServerError(w, r, err)
			return
		}
		if err := r.Body.Close(); err != nil {
			sendServerError(w, r, err)
			return
		}

		var newBudgets model.Budgets
		if err := json.Unmarshal(body, &newBudgets); err != nil {
			sendResponse(w, r, err, http.StatusUnprocessableEntity)
			return
		}

		if err := updateBudgets(newBudgets); err != nil {
			sendServerError(w, r, err)
		}

		sendResponse(w, r, "Account budgets updated.", http.StatusOK)
	}
}
