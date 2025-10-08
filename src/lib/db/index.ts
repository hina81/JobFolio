import { createRxDatabase, type RxDatabase } from "rxdb/plugins/core";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { jobSchema } from "./schema";

export const getDB = (() => {
  let dbPromise: Promise<RxDatabase> | null = null;

  return async function () {
    if (!dbPromise) {
      dbPromise = (async () => {
        try {
          const db = await createRxDatabase({
            name: "jobsdb",
            storage: getRxStorageDexie(),
          });

          await db.addCollections({
            jobs: { schema: jobSchema },
          });

          return db;
        } catch (error) {
          // エラー時はPromiseをクリアして再試行可能にする
          dbPromise = null;
          throw error;
        }
      })();
    }

    return dbPromise;
  };
})();
