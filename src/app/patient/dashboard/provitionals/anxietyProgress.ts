export const PROVITIONAL_DOCTORS: Doctor[] = [
  {
    name: 'Dr. Álvaro Sánchez',
    image: 'assets/images/banner/doctor-1.jpg',
    profession: 'Psiquiatra',
  },
];

export interface Doctor {
  name: string;
  image: string;
  profession: string;
}