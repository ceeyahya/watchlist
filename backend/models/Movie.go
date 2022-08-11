package models

type Movie struct {
	ID          uint     `json:"id"`
	Title       string   `json:"title"`
	ReleaseYear string   `json:"releaseYear"`
	Synopsis    string   `json:"synopsis"`
	Status      bool     `json:"status"`
	Review      string   `json:"review"`
	DirectorID  int      `json:"directorId"`
	Director    Director `json:"director" gorm:"foreignKey:DirectorID"`
}

type Director struct {
	ID          int    `json:"id"`
	Fullname    string `json:"fullname"`
	Nationality string `json:"nationality"`
}
