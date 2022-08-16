package routes

import (
	"fmt"

	"github.com/ceeyahya/watchlist-backend/database"
	"github.com/ceeyahya/watchlist-backend/models"
	"github.com/gofiber/fiber/v2"
)

type StatElement struct {
	Nationality string `json:"nationality"`
	Count       int64  `json:"count"`
}

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

func getMoviesPerCountry() []StatElement {
	directors := []models.Director{}
	movies := []models.Movie{}
	var nationalities []string

	database.Instance.Db.Distinct("nationality").Find(&directors).Scan(&nationalities)
	database.Instance.Db.Find(&movies)

	var response []StatElement

	for _, nationality := range nationalities {
		var count int64
		query := fmt.Sprintf("SELECT COUNT(movies.title) FROM movies INNER JOIN directors ON directors.id=movies.director_id WHERE directors.nationality = '%s';", nationality)

		database.Instance.Db.Raw(query).Scan(&count)

		stat := StatElement{
			Nationality: nationality,
			Count:       count,
		}

		response = append(response, stat)
	}

	return response
}

func GetGeneralStatistics(c *fiber.Ctx) error {
	moviesCount := getMoviesCount()
	directorsCount := getDirectorsCount()
	countriesCount := getCountriesCount()
	moviesPerCountry := getMoviesPerCountry()

	return c.Status(200).JSON(fiber.Map{
		"movies":    moviesCount,
		"directors": directorsCount,
		"countries": countriesCount,
		"mpc":       moviesPerCountry})
}
