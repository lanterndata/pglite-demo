## Demo Application Showcasing Extension Support in Pglite

Live Demo: https://pglite.lantern.dev

In this demo we have used our modified version of [Pglite](https://github.com/lanterndata/pglite/tree/dynamic-extension-support) where we have enabled extension support via dynamic loading.  

The demo loads Lantern and Pgvector extensions into the database and builds a vector index on [this dataset](https://www.kaggle.com/datasets/khushishahh/fast-food-restaurants-across-us) which contains 10.000 fast-food restaurants around US.  

There's also interactive psql shell which can be used to interact with the database.

<img width="1574" alt="image" src="https://github.com/lanterndata/pglite-demo/assets/17221195/06b9d811-78bc-44d2-80c7-3925fb0fe79f">
