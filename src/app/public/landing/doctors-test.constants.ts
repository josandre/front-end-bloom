export const PROVITIONAL_DOCTORS: Doctor[] = [
  {
    name: 'Dr. Álvaro Sánchez',
    image: 'assets/images/banner/doctor-1.jpg',
    profession: 'Psiquiatra',
  },
  {
    name: 'Dr. Enrique Torres',
    image: 'assets/images/banner/doctor-1.jpg',
    profession: 'Psicólogo',
  },
  {
    name: 'Dra. Carmen Gómez',
    image: 'assets/images/banner/doctor-1.jpg',
    profession: 'Psicóloga Clínica',
  },
];

export interface Doctor {
  name: string;
  image: string;
  profession: string;
}