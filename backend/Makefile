.PHONY: start
start:
	go clean
	go build
	./backend

.PHONY: clean
clean:
	go clean
	rm -f storage/cache/accountbudgets/*.json
