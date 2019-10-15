package main

import (
	"aws-budgets/backend/aws"
	"aws-budgets/backend/rest"
	"log"
)

func main() {
	acache := aws.NewAwsClientCache(true)
	controller := rest.NewController(acache)
	if err := controller.Init(); err != nil {
		panic(err)
	}
	log.Println("AWS client cache and REST controller initialized.")

	rest.Start(controller)
}
