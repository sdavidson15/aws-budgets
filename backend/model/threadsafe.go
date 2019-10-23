package model

import "sync"

type threadSafeError struct {
	lock sync.RWMutex
	err  error
}

func NewThreadSafeError() *threadSafeError {
	return &threadSafeError{}
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

type threadSafeMap struct {
	lock sync.RWMutex
	tmap map[interface{}]interface{}
}

func NewThreadSafeMap() *threadSafeMap {
	return &threadSafeMap{
		tmap: map[interface{}]interface{}{},
	}
}

func (tmap *threadSafeMap) Set(key interface{}, value interface{}) {
	tmap.lock.Lock()
	defer tmap.lock.Unlock()

	tmap.tmap[key] = value
}

func (tmap *threadSafeMap) Get(key interface{}) interface{} {
	tmap.lock.RLock()
	defer tmap.lock.RUnlock()

	return tmap.tmap[key]
}

func (tmap *threadSafeMap) Keys() []interface{} {
	tmap.lock.RLock()
	defer tmap.lock.RUnlock()

	keys := []interface{}{}
	for key, _ := range tmap.tmap {
		keys = append(keys, key)
	}

	return keys
}
