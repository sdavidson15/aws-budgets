package rest

import (
	"encoding/json"
	"io"
	"io/ioutil"
	"net/http"
	
	"aws-budgets/backend/model"
)

const byteLimit int64 = 1048576

type route struct {
	name        string
	method      string
	pattern     string
	handlerFunc http.HandlerFunc
}

type routes []route

func restRoutes(controller *Controller) routes {
	return routes{
		route{`Get account budgets`, `GET`, `/accountbudgets`, getAccountBudgetsHandler(controller)},
		route{`Update account budgets`, `PUT`, `/updateaccountbudgets`, updateAccountBudgetsHandler(controller)},
	}
}

func getAccountBudgetsHandler(controller *Controller) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		accountBudgets, err := controller.getAccountBudgets()
		if err != nil {
			sendServerError(w, r, err)
			return
		}
		sendResponse(w, r, accountBudgets, http.StatusOK)
	}
}

func updateAccountBudgetsHandler(controller *Controller) http.HandlerFunc {
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
	
		if err := controller.updateAccountBudgets(newBudgets); err != nil {
			sendServerError(w, r, err)
		}
		
		sendResponse(w, r, "Account budgets updated.", http.StatusOK)
	}
}
