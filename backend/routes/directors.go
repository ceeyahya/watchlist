package routes

import (
	"github.com/ceeyahya/watchlist-backend/database"
	"github.com/ceeyahya/watchlist-backend/models"
	"github.com/gofiber/fiber/v2"
)

func CreateDirector(c *fiber.Ctx) error {
	director := new(models.Director)
	if err := c.BodyParser(director); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	result := database.Instance.Db.Create(&director)

	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Internal Server Error"})
	}

	if result.RowsAffected == 1 {
		return c.Status(201).JSON(director)
	}

	return c.Status(409).JSON(fiber.Map{"error": "Record Already Exists"})
}

func GetAllDirectors(c *fiber.Ctx) error {
	directors := []models.Director{}
	database.Instance.Db.Find(&directors)
	return c.Status(200).JSON(directors)
}

func GetDirector(c *fiber.Ctx) error {
	id := c.Params("id")
	director := models.Director{}

	result := database.Instance.Db.Find(&director, "id = ?", id)

	if result.RowsAffected == 0 {
		return c.Status(404).JSON(fiber.Map{"error": "Record Not Found"})
	}

	return c.Status(200).JSON(director)
}

func GetDirectorMovies(c *fiber.Ctx) error {
	id := c.Params("id")
	movies := []models.Movie{}

	database.Instance.Db.Find(&movies, "director_id = ?", id)

	return c.Status(200).JSON(movies)
}

func UpdateDirector(c *fiber.Ctx) error {
	id := c.Params("id")
	director := new(models.Director)

	if err := c.BodyParser(director); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	database.Instance.Db.Where("id = ?", id).Updates(&director)

	return c.Status(200).JSON(fiber.Map{"info": "Record Successfully Updated"})
}

func DeleteDirector(c *fiber.Ctx) error {
	id := c.Params("id")
	director := models.Director{}

	database.Instance.Db.Delete(&director, id)

	return c.Status(204).JSON(fiber.Map{"info": "Record Successfully Deleted"})
}
