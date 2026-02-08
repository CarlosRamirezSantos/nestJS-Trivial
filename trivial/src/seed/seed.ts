import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { TrivialService } from '../trivial/trivial.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);
  const trivialService = app.get(TrivialService);

  console.log('🌱 INICIANDO SEED MANUAL...');

  const adminEmail = 'admin@trivial.com';
  const adminPass = 'adminpassword123';

  console.log('👤 Gestionando usuario Admin...');

  try {
    const existingUser = await usersService.findEmail(adminEmail).catch(() => null);

    if (existingUser) {
      console.log('   ♻️ Usuario encontrado. Borrando para regenerar limpio...');

      await usersService.remove(existingUser.id);
    }


    console.log('   ⚡ Creando Admin...');
    await usersService.create({
      name: 'Admin Principal',
      email: adminEmail,
      password: adminPass,
      roles: ['admin', 'user'], 
    } as any);
    
    console.log(`   ✅ Admin creado: ${adminEmail} / ${adminPass}`);
  } catch (error) {
    console.error('   ❌ Error en bloque Admin:', error.message);
  }

  console.log('📚 Gestionando Preguntas...');
  
  try {
    if (trivialService['removeAll']) {
      await trivialService['removeAll']();
      console.log('   🧹 Preguntas antiguas eliminadas.');
    }
  } catch (e) {
    console.log('   ⚠️ No se pudieron borrar preguntas antiguas automáticamente.');
  }

  const preguntas = [
    { question: "¿Cuál es la capital de Francia?", options: ["Lyon", "Marsella", "París", "Burdeos"], correctAnswer: 2, points: 10 },
    { question: "¿Cuál es la capital de Alemania?", options: ["Hamburgo", "Berlín", "Múnich", "Frankfurt"], correctAnswer: 1, points: 10 },
    { question: "¿Cuál es la capital de Italia?", options: ["Milán", "Venecia", "Nápoles", "Roma"], correctAnswer: 3, points: 10 },
    { question: "¿Cuál es la capital de España?", options: ["Madrid", "Barcelona", "Sevilla", "Valencia"], correctAnswer: 0, points: 10 },
    { question: "¿Cuál es la capital de Portugal?", options: ["Oporto", "Lisboa", "Coimbra", "Braga"], correctAnswer: 1, points:  10 },
    { question: "¿Cuál es la capital de Reino Unido?", options: ["Manchester", "Liverpool", "Londres", "Edimburgo"], correctAnswer: 2, points: 10 },
    { question: "¿Cuál es la capital de Grecia?", options: ["Atenas", "Tesalónica", "Patras", "Heraclión"], correctAnswer: 0, points: 15 },
    { question: "¿Cuál es la capital de Noruega?", options: ["Bergen", "Stavanger", "Trondheim", "Oslo"], correctAnswer: 3, points: 15 },
    { question: "¿Cuál es la capital de Países Bajos?", options: ["La Haya", "Ámsterdam", "Rotterdam", "Utrecht"], correctAnswer: 1, points: 15 },
    { question: "¿Cuál es la capital de Austria?", options: ["Salzburgo", "Innsbruck", "Graz", "Viena"], correctAnswer: 3, points: 15 },
    { question: "¿Cuál es la capital de Polonia?", options: ["Varsovia", "Cracovia", "Gdansk", "Breslavia"], correctAnswer: 0, points: 20 },
    { question: "¿Cuál es la capital de Hungría?", options: ["Debrecen", "Szeged", "Budapest", "Miskolc"], correctAnswer: 2, points: 20 },
    { question: "¿Cuál es la capital de República Checa?", options: ["Brno", "Praga", "Ostrava", "Plzen"], correctAnswer: 1, points: 20 },
    { question: "¿Cuál es la capital de Islandia?", options: ["Kópavogur", "Hafnarfjörður", "Akureyri", "Reikiavik"], correctAnswer: 3, points: 30 },
    { question: "¿Cuál es la capital de Canadá?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], correctAnswer: 2, points: 20 },
    { question: "¿Cuál es la capital de Argentina?", options: ["Rosario", "Córdoba", "Buenos Aires", "Mendoza"], correctAnswer: 2, points: 10 },
    { question: "¿Cuál es la capital de Brasil?", options: ["Río de Janeiro", "Brasilia", "São Paulo", "Salvador"], correctAnswer: 1, points: 15 },
    { question: "¿Cuál es la capital de Colombia?", options: ["Medellín", "Cali", "Barranquilla", "Bogotá"], correctAnswer: 3, points: 10 },
    { question: "¿Cuál es la capital de Chile?", options: ["Valparaíso", "Concepción", "Santiago", "Antofagasta"], correctAnswer: 2, points: 10 },
    { question: "¿Cuál es la capital de México?", options: ["Guadalajara", "Monterrey", "Ciudad de México", "Puebla"], correctAnswer: 2, points: 10 },
    { question: "¿Cuál es la capital de Estados Unidos?", options: ["Nueva York", "Los Ángeles", "Chicago", "Washington D.C."], correctAnswer: 3, points: 10 },
    { question: "¿Cuál es la capital de Perú?", options: ["Cusco", "Arequipa", "Lima", "Trujillo"], correctAnswer: 2, points: 10 },
    { question: "¿Cuál es la capital de Uruguay?", options: ["Montevideo", "Salto", "Paysandú", "Punta del Este"], correctAnswer: 0, points: 15 },
    { question: "¿Cuál es la capital de Venezuela?", options: ["Maracaibo", "Valencia", "Barquisimeto", "Caracas"], correctAnswer: 3, points: 10 },
    { question: "¿Cuál es la capital de Cuba?", options: ["Santiago de Cuba", "Camagüey", "La Habana", "Holguín"], correctAnswer: 2, points: 15 },
    { question: "¿Cuál es la capital de Ecuador?", options: ["Guayaquil", "Cuenca", "Quito", "Ambato"], correctAnswer: 2, points: 20 },
    { question: "¿Cuál es la capital de Japón?", options: ["Osaka", "Kioto", "Yokohama", "Tokio"], correctAnswer: 3, points: 10 },
    { question: "¿Cuál es la capital de China?", options: ["Shanghái", "Pekín", "Cantón", "Shenzhen"], correctAnswer: 1, points: 15 },
    { question: "¿Cuál es la capital de India?", options: ["Bombay", "Calcuta", "Nueva Delhi", "Bangalore"], correctAnswer: 2, points: 20 },
    { question: "¿Cuál es la capital de Corea del Sur?", options: ["Busan", "Incheon", "Daegu", "Seúl"], correctAnswer: 3, points: 15 },
    { question: "¿Cuál es la capital de Tailandia?", options: ["Bangkok", "Phuket", "Chiang Mai", "Pattaya"], correctAnswer: 0, points: 15 },
    { question: "¿Cuál es la capital de Indonesia?", options: ["Surabaya", "Yakarta", "Bandung", "Medan"], correctAnswer: 1, points: 25 },
    { question: "¿Cuál es la capital de Vietnam?", options: ["Ho Chi Minh", "Hanoi", "Da Nang", "Haiphong"], correctAnswer: 1, points: 25 },
    { question: "¿Cuál es la capital de Filipinas?", options: ["Cebú", "Davao", "Manila", "Quezon"], correctAnswer: 2, points: 25 },
    { question: "¿Cuál es la capital de Turquía?", options: ["Estambul", "Esmirna", "Bursa", "Ankara"], correctAnswer: 3, points: 20 },
    { question: "¿Cuál es la capital de Egipto?", options: ["Alejandría", "Giza", "El Cairo", "Luxor"], correctAnswer: 2, points: 15 },
    { question: "¿Cuál es la capital de Marruecos?", options: ["Casablanca", "Rabat", "Marrakech", "Fez"], correctAnswer: 1, points: 20 },
    { question: "¿Cuál es la capital de Sudáfrica (administrativa)?", options: ["Ciudad del Cabo", "Pretoria", "Johannesburgo", "Durban"], correctAnswer: 1, points: 30 },
    { question: "¿Cuál es la capital de Kenia?", options: ["Mombasa", "Kisumu", "Nairobi", "Nakuru"], correctAnswer: 2, points: 25 },
    { question: "¿Cuál es la capital de Etiopía?", options: ["Addis Abeba", "Dire Dawa", "Gondar", "Mekele"], correctAnswer: 0, points: 30 },
    { question: "¿Cuál es la capital de Nigeria?", options: ["Lagos", "Kano", "Ibadán", "Abuya"], correctAnswer: 3, points: 30 },
    { question: "¿Cuál es la capital de Senegal?", options: ["Dakar", "Saint-Louis", "Thiès", "Ziguinchor"], correctAnswer: 0, points: 30 },
    { question: "¿Cuál es la capital de Australia?", options: ["Sídney", "Melbourne", "Canberra", "Brisbane"], correctAnswer: 2, points: 25 },
    { question: "¿Cuál es la capital de Nueva Zelanda?", options: ["Auckland", "Wellington", "Christchurch", "Hamilton"], correctAnswer: 1, points: 30 },
    { question: "¿Cuál es la capital de Suiza?", options: ["Zúrich", "Ginebra", "Berna", "Basilea"], correctAnswer: 2, points: 30 },
    { question: "¿Cuál es la capital de Finlandia?", options: ["Espoo", "Tampere", "Vantaa", "Helsinki"], correctAnswer: 3, points: 20 },
    { question: "¿Cuál es la capital de Irlanda?", options: ["Cork", "Galway", "Limerick", "Dublín"], correctAnswer: 3, points: 15 },
    { question: "¿Cuál es la capital de Croacia?", options: ["Split", "Rijeka", "Zagreb", "Zadar"], correctAnswer: 2, points: 25 },
    { question: "¿Cuál es la capital de Suecia?", options: ["Gotemburgo", "Malmö", "Estocolmo", "Uppsala"], correctAnswer: 2, points: 15 },
    { question: "¿Cuál es la capital de Dinamarca?", options: ["Aarhus", "Odense", "Copenhague", "Aalborg"], correctAnswer: 2, points: 15 }
  ];

  for (const p of preguntas) {

    await trivialService.create(p as any);
  }
  console.log(`   ✅ ${preguntas.length} Preguntas insertadas.`);

  await app.close();
  console.log('👋 SEED FINALIZADO.');
}

bootstrap();