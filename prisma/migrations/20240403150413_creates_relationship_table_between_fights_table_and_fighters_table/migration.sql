-- CreateTable
CREATE TABLE "matches" (
    "id" SERIAL NOT NULL,
    "cover_image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "about" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match_participants" (
    "id" SERIAL NOT NULL,
    "match_id" INTEGER NOT NULL,
    "fighter_id" INTEGER NOT NULL,

    CONSTRAINT "match_participants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "match_participants" ADD CONSTRAINT "match_participants_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "matches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match_participants" ADD CONSTRAINT "match_participants_fighter_id_fkey" FOREIGN KEY ("fighter_id") REFERENCES "fighters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
