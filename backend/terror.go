package main

import "sync"

type threadSafeError struct {
	lock sync.RWMutex
	err  error
}

func (terr *threadSafeError) set(err error) {
	e.lock.Lock()
	defer e.lock.Unlock()

	e.err = err
}

func (e *threadSafeError) get() error {
	e.lock.RLock()
	defer e.lock.RUnlock()

	return e.err
}

func newThreadSafeError() *threadSafeError {
	return &threadSafeError{}
}
