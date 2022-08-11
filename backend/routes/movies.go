package routes

import (
	"github.com/ceeyahya/watchlist-backend/database"
	"github.com/ceeyahya/watchlist-backend/models"
	"github.com/gofiber/fiber/v2"
)

func CreateMovie(c *fiber.Ctx) error {
	movie := new(models.Movie)
	if err := c.BodyParser(movie); err != nil {
		return c.Status(400).JSON(err.Error())
	}
	database.Instance.Db.Create(&movie)
	return c.Status(201).JSON(movie)
}

func GetAllMovies(c *fiber.Ctx) error {
	movies := []models.Movie{}
	respMovie := []models.Movie{}

	database.Instance.Db.Find(&movies)

	for _, movie := range movies {
		var director models.Director

		database.Instance.Db.Find(&director, "id = ?", movie.DirectorID)
		respMovie = append(respMovie, models.Movie{ID: movie.ID, Title: movie.Title, Synopsis: movie.Synopsis, Status: movie.Status, ReleaseYear: movie.ReleaseYear, Review: movie.Review, Director: director})
	}

	return c.Status(200).JSON(respMovie)
}
