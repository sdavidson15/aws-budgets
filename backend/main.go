package main

import (
    "aws-budgets/backend/aws"
    "aws-budgets/backend/rest"
)

func main() {
    acache := aws.NewAwsClientCache(true)
    controller := rest.NewController(acache)
    
    if err := controller.Init(); err != nil {
        panic(err)
    }
    
	rest.Start(controller)
}
