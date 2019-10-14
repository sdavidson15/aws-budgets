package main

import "aws-budgets/backend/rest"

func main() {
	rest.Start(DEFAULT_PORT, ALLOWED_HEADER, ALLOWED_ORIGIN)
}
