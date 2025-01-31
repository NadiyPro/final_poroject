// import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
//
// export class CreateUpdateModel {
//   @CreateDateColumn()
//   //  Цей декоратор автоматично зберігає дату та час створення запису.
//   //  Значення в цій колонці встановлюється лише один раз,
//   //  коли запис створюється. Колонка createdAt буде
//   //  автоматично заповнюватись датою і часом під час створення нового запису.
//   created: Date;
//
//   @UpdateDateColumn()
//   // Цей декоратор автоматично оновлює дату та час кожного разу,
//   // коли запис змінюється. Значення змінюється при кожному оновленні запису.
//   // Колонка updatedAt буде автоматично оновлюватись щоразу,
//   // коли запис оновлюється.
//   updated: Date;
// }
