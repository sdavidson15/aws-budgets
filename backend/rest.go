package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func start(port, allowedHeader, allowedOrigin, allowedMethod string) {
	router := mux.NewRouter().StrictSlash(true)

	for _, route := range restRoutes() {
		var handler http.Handler

		handler = route.handlerFunc
		handler = aclSwapper(handler)
		handler = logger(handler, route.name)

		router.Methods(route.method).Path(route.pattern).Name(route.name).Handler(handler)
	}

	allowedHeaders := handlers.AllowedHeaders([]string{allowedHeader})
	allowedOrigins := handlers.AllowedOrigins([]string{allowedOrigin})
	allowedMethods := handlers.AllowedMethods([]string{allowedMethod})
	log.Fatal(http.ListenAndServe(port, handlers.CORS(allowedHeaders, allowedOrigins, allowedMethods)(router)))
}

func sendResponse(w http.ResponseWriter, r *http.Request, resp interface{}, statusCode int) {
	w.Header().Set(`Content`, `application/json; charset=UTF-8`)
	w.WriteHeader(statusCode)
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		panic(err)
	}
}

func aclSwapper(inner http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// TODO: swap out request origin for allowed origin if it's in the ACL
		inner.ServeHTTP(w, r)
	})
}

func logger(inner http.Handler, name string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		t0 := time.Now()
		inner.ServeHTTP(w, r)
		log.Printf("%s\t%s\t%s\t%s", r.Method, r.RequestURI, name, time.Since(t0))
	})
}
