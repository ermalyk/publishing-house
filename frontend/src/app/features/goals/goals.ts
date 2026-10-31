import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-goals',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './goals.html',
  styleUrl: './goals.scss',
})
export class Goals {
  protected readonly goals = [
    {
      title: 'Паметта като съпротива',
      text: 'Публикуваме свидетелства и изследвания, които пазят от забрава борбата срещу фашизма и всяка форма на потисничество.',
    },
    {
      title: 'Достъп до книгата за всички',
      text: 'Поддържаме достъпни цени и разработваме програма за дарение на книги в читалища и училищни библиотеки.',
    },
    {
      title: 'Подкрепа за нови автори',
      text: 'Търсим и издаваме съвременни гласове с лява и социална чувствителност — поезия, проза и публицистика.',
    },
    {
      title: 'Солидарна общност',
      text: 'Организираме срещи с автори, дискусии и четения, които свързват читателите около общи ценности.',
    },
  ];
}
