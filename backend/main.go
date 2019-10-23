package main

import (
	"aws-budgets/backend/controller"
)

func main() {
	if err := controller.NewController().StartServer(); err != nil {
		panic(err)
	}
}
