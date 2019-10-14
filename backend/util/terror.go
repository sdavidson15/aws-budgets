package main

import "sync"

type threadSafeError struct {
	lock sync.RWMutex
	err  error
}

func (terr *threadSafeError) set(err error) {
	terr.lock.Lock()
	defer terr.lock.Unlock()

	terr.err = err
}

func (terr *threadSafeError) get() error {
	terr.lock.RLock()
	defer terr.lock.RUnlock()

	return terr.err
}

func newThreadSafeError() *threadSafeError {
	return &threadSafeError{}
}
