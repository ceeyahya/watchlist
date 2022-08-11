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
	database.Instance.Db.Create(&director)
	return c.Status(201).JSON(director)
}
