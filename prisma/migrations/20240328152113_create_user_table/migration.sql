-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "user_type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "accepted_terms" BOOLEAN DEFAULT false,
    "created_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "password_reset_code" TEXT,
    "account_activation_code" TEXT,
    "account_is_active" BOOLEAN DEFAULT false,
    "code_expiration_date" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_user_type_key" ON "Users"("email", "user_type");
