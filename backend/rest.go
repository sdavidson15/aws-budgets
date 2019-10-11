package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func start(port, allowedHeader, allowedOrigin string) {
	router := mux.NewRouter().StrictSlash(true)

	for _, route := range restRoutes() {
		var handler http.Handler

		handler = route.handlerFunc
		handler = logger(handler, route.name)

		router.Methods(route.method).Path(route.pattern).Name(route.name).Handler(handler)
	}

	allowedHeaders := handlers.AllowedHeaders([]string{allowedHeader})
	allowedOrigins := handlers.AllowedOrigins([]string{allowedOrigin})
	allowedMethods := handlers.AllowedMethods(ALLOWED_METHODS)
	log.Fatal(http.ListenAndServe(port, handlers.CORS(allowedHeaders, allowedOrigins, allowedMethods)(router)))
}

func logger(inner http.Handler, name string) http.Handler {
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
	sendResponse(w, r, err, http.StatusInternalServerError)
}
