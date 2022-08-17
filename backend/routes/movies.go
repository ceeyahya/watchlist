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

	result := database.Instance.Db.Create(&movie)

	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Internal Server Error"})
	}

	if result.RowsAffected == 1 {
		return c.Status(201).JSON(movie)
	}

	return c.Status(409).JSON(fiber.Map{"error": "Record Already Exists"})
}

func GetAllMovies(c *fiber.Ctx) error {
	movies := []models.Movie{}

	database.Instance.Db.Model(&models.Movie{}).Find(&movies)

	// for _, movie := range movies {
	// 	var director models.Director
	// 	database.Instance.Db.Find(&director, "id = ?", movie.DirectorID)
	// 	respMovie = append(respMovie, models.Movie{ID: movie.ID, Title: movie.Title, Synopsis: movie.Synopsis, Status: movie.Status, ReleaseYear: movie.ReleaseYear, Review: movie.Review, Director: director, Cover: movie.Cover, DirectorID: movie.DirectorID})
	// }

	return c.Status(200).JSON(&movies)
}

func GetMovie(c *fiber.Ctx) error {
	id := c.Params("id")
	movie := models.Movie{}
	director := models.Director{}
	respMovie := models.Movie{}

	result := database.Instance.Db.Find(&movie, "id = ?", id)

	if result.RowsAffected == 0 {
		return c.Status(404).JSON(fiber.Map{"error": "Record Not Found"})
	}

	database.Instance.Db.Find(&director, "id = ?", movie.DirectorID)
	respMovie = models.Movie{ID: movie.ID, Title: movie.Title, Synopsis: movie.Synopsis, Status: movie.Status, ReleaseYear: movie.ReleaseYear, Review: movie.Review, Director: director}

	return c.Status(200).JSON(respMovie)
}

func UpdateMovie(c *fiber.Ctx) error {
	id := c.Params("id")
	movie := new(models.Movie)

	if err := c.BodyParser(movie); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	database.Instance.Db.Where("id = ?", id).Updates(&movie)

	return c.Status(200).JSON(fiber.Map{"info": "Record Successfully Updated"})
}

func DeleteMovie(c *fiber.Ctx) error {
	id := c.Params("id")
	movie := models.Movie{}

	database.Instance.Db.Delete(&movie, id)

	return c.Status(204).JSON(fiber.Map{"info": "Record Successfully Deleted"})
}
