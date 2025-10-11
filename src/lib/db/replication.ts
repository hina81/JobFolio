import { replicateCouchDB } from "rxdb/plugins/replication-couchdb";
import { getDB } from ".";

export const getJobCollection = async () => {
  const db = await getDB();
  return db.jobs;
};

export const replicationState = async () => {
  const jobCollection = await getJobCollection();

  const couchdbUrl = import.meta.env.VITE_COUCHDB_URL;

  return replicateCouchDB({
    replicationIdentifier: "jobfolio-couchdb-replication",
    collection: jobCollection,
    // url to the CouchDB endpoint (required)
    url: couchdbUrl,
    /**
     * true for live replication,
     * false for a one-time replication.
     * [default=true]
     */
    live: true,
    /**
     * A custom fetch() method can be provided
     * to add authentication or credentials.
     * Can be swapped out dynamically
     * by running 'replicationState.fetch = newFetchMethod;'.
     * (optional)
     */
    // fetch: myCustomFetchMethod,
    pull: {
      /**
       * Amount of documents to be fetched in one HTTP request
       * (optional)
       */
      batchSize: 60,
      /**
       * Custom modifier to mutate pulled documents
       * before storing them in RxDB.
       * (optional)
       */
      modifier: (docData) => {
        return docData;
      },
      /**
       * Heartbeat time in milliseconds
       * for the long polling of the changestream.
       * @link https://docs.couchdb.org/en/3.2.2-docs/api/database/changes.html
       * (optional, default=60000)
       */
      heartbeat: 60000,
    },
    push: {
      /**
       * How many local changes to process at once.
       * (optional)
       */
      batchSize: 60,
      /**
       * Custom modifier to mutate documents
       * before sending them to the CouchDB endpoint.
       * (optional)
       */
      modifier: (docData) => {
        return docData;
      },
    },
  });
};
