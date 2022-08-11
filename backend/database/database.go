package database

import (
	"fmt"
	"log"
	"os"

	"github.com/ceeyahya/watchlist-backend/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type DBInstance struct {
	Db *gorm.DB
}

var Instance DBInstance

func Connect() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("[Error]: Error while loading the .env file.")
	}

	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	port := os.Getenv("DB_PORT")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s", host, user, password, dbname, port)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		log.Fatal("[Error]: Error while connecting to the database.")
		os.Exit(2)
	}

	log.Println("[Success]: Successfully Connected to the database.")
	db.Logger = logger.Default.LogMode(logger.Info)
	log.Println("[Info]: Running Migrations.")
	db.AutoMigrate(&models.Movie{}, &models.Director{})

	Instance = DBInstance{
		Db: db,
	}
}
