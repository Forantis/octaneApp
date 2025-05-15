import { useQuery } from '@tanstack/react-query';

export const useGetCars = () => {
  return useQuery({
    queryKey: ['cars'],
    queryFn: async () => {
      const response = await fetch('https://octaneserver.onrender.com/api/cars');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  });
};

export const useGetCarById = (id: string) => {
  return useQuery({
    queryKey: ['cars', id],
    queryFn: async () => {
      const response = await fetch(`https://octaneserver.onrender.com/api/cars/${id}`); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  });
};