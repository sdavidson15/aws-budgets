package rest

import (
	"aws-budgets/backend/model"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type RestApp struct {
	restRoutes routes
}

func NewRestApp(
	getBudgets func() (model.Budgets, error),
	updateBudgets func(model.Budgets) error,
) *RestApp {
	return &RestApp{
		restRoutes: initRoutes(
			getBudgets,
			updateBudgets,
		),
	}
}

func (r *RestApp) Start() {
	router := mux.NewRouter().StrictSlash(true)

	for _, route := range r.restRoutes {
		var handler http.Handler

		handler = route.handlerFunc
		handler = r.logger(handler, route.name)

		router.Methods(route.method).Path(route.pattern).Name(route.name).Handler(handler)
	}

	allowedHeaders := handlers.AllowedHeaders([]string{ALLOWED_HEADER})
	allowedOrigins := handlers.AllowedOrigins([]string{ALLOWED_ORIGIN})
	allowedMethods := handlers.AllowedMethods(ALLOWED_METHODS)
	log.Fatal(http.ListenAndServe(DEFAULT_PORT, handlers.CORS(allowedHeaders, allowedOrigins, allowedMethods)(router)))
}

func (r *RestApp) logger(inner http.Handler, name string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		t0 := time.Now()
		inner.ServeHTTP(w, r)
		log.Printf("%s\t%s\t%s\t%s", r.Method, r.RequestURI, name, time.Since(t0))
	})
}

func sendResponse(w http.ResponseWriter, r *http.Request, resp interface{}, statusCode int) {
	w.Header().Set(`Content`, `application/json; charset=UTF-8`)
	w.WriteHeader(statusCode)
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		panic(err)
	}
}

func sendServerError(w http.ResponseWriter, r *http.Request, err error) {
	log.Printf("[ERROR] Server error: %s", err.Error())
	sendResponse(w, r, err, http.StatusInternalServerError)
}
