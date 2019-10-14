package util

import "sync"

type threadSafeError struct {
	lock sync.RWMutex
	err  error
}

func (terr *threadSafeError) Set(err error) {
	terr.lock.Lock()
	defer terr.lock.Unlock()

	terr.err = err
}

func (terr *threadSafeError) Get() error {
	terr.lock.RLock()
	defer terr.lock.RUnlock()

	return terr.err
}

func NewThreadSafeError() *threadSafeError {
	return &threadSafeError{}
}
