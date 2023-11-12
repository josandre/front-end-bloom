export const PROVITIONAL_DOCTORS: Doctor[] = [
  {
    name: 'Dr. Álvaro Sánchez',
    image: 'assets/images/banner/doctor-1.jpg',
    role: 'Psiquiatra',
  },
  {
    name: 'Dr. Enrique Torres',
    image: 'assets/images/banner/doctor-1.jpg',
    role: 'Psicólogo',
  },
  {
    name: 'Dra. Carmen Gómez',
    image: 'assets/images/banner/doctor-1.jpg',
    role: 'Psicóloga Clínica',
  },
];

export interface Doctor {
  name: string;
  image: string;
  role: string;
}