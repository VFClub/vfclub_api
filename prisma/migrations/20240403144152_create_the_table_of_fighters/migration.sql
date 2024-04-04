-- CreateTable
CREATE TABLE "fighters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "squad" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "points" INTEGER DEFAULT 0,
    "created_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "fighters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fighters" ADD CONSTRAINT "fighters_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
