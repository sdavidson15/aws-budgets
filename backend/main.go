package main

import (
    "log"
    
    "aws-budgets/backend/aws"
    "aws-budgets/backend/rest"
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
