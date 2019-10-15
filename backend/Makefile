.PHONY: start
start:
	go clean
	go build
	./backend

.PHONY: clean
clean:
	go clean
	rm -f aws/cache/accountbudgets/*.json
	rm -f aws/cache/budgetHistory/*.json
