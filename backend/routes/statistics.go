package routes

import (
	"github.com/ceeyahya/watchlist-backend/database"
	"github.com/ceeyahya/watchlist-backend/models"
	"github.com/gofiber/fiber/v2"
)

func GetLenDirectors(c *fiber.Ctx) error {
	directors := []models.Director{}

	result := database.Instance.Db.Find(&directors)

	return c.Status(200).JSON(fiber.Map{"directors": result.RowsAffected})
}

func GetLenMovies(c *fiber.Ctx) error {
	movies := []models.Movie{}

	result := database.Instance.Db.Find(&movies)

	return c.Status(200).JSON(fiber.Map{"movies": result.RowsAffected})
}
