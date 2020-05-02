package handler

import (
	"io"
	"log"
	"net/http"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	keys := r.URL.Query()["url"]
	key := keys[0]

	res, err := http.Get(key)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()
	for name, values := range res.Header {
		w.Header()[name] = values
	}
	w.WriteHeader(res.StatusCode)
	_, _ = io.Copy(w, res.Body)
}
