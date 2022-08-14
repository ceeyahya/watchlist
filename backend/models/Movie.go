package models

type Movie struct {
	ID          uint     `json:"id"`
	Title       string   `json:"title" gorm:"uniqueIndex"`
	ReleaseYear string   `json:"releaseYear"`
	Synopsis    string   `json:"synopsis"`
	Status      bool     `json:"status"`
	Review      string   `json:"review"`
	Cover       string   `json:"cover"`
	DirectorID  int      `json:"directorId"`
	Director    Director `json:"director" gorm:"foreignKey:DirectorID"`
}

type Director struct {
	ID          int    `json:"id"`
	Fullname    string `json:"fullname" gorm:"uniqueIndex"`
	Avatar      string `json:"avatar"`
	Nationality string `json:"nationality"`
}
