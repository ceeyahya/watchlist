package routes

import (
	"github.com/ceeyahya/watchlist-backend/database"
	"github.com/ceeyahya/watchlist-backend/models"
	"github.com/gofiber/fiber/v2"
)

func getDirectorsCount() int64 {
	directors := []models.Director{}
	var count int64
	database.Instance.Db.Find(&directors).Count(&count)
	return count
}

func getMoviesCount() int64 {
	movies := []models.Movie{}
	var count int64
	database.Instance.Db.Find(&movies).Count(&count)
	return count
}

func getCountriesCount() int64 {
	directors := []models.Director{}
	var count int64
	database.Instance.Db.Distinct("nationality").Find(&directors).Count(&count)
	return count
}

func GetGeneralStatistics(c *fiber.Ctx) error {
	moviesCount := getMoviesCount()
	directorsCount := getDirectorsCount()
	countriesCount := getCountriesCount()

	return c.Status(200).JSON(fiber.Map{"movies": moviesCount, "directors": directorsCount, "countries": countriesCount})
}
