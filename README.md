# Budget Manager

Wszechstronna aplikacja mobilna do zarządzania finansami osobistymi, stworzona z użyciem React Native i Firebase. Umożliwia użytkownikom śledzenie wydatków i dochodów, zarządzanie budżetem oraz przeglądanie historii finansowej — wszystko z płynną synchronizacją offline/online.

## Funkcje

* 📱 Aplikacja mobilna działająca na wielu platformach (iOS i Android)
* 👤 Uwierzytelnianie użytkowników i zarządzanie kontem
* 💰 Śledzenie dochodów i wydatków z podziałem na kategorie
* 📊 Pulpit z podsumowaniem finansowym
* 🔄 Tryb offline z automatyczną synchronizacją
* 🌐 Kopia zapasowa danych w chmurze
* 🔒 Bezpieczne przechowywanie danych

## Użyte technologie

* **Frontend**:

    * React Native (Expo)
    * TypeScript
    * Expo Router do nawigacji
    * React Context API do zarządzania stanem
* **Backend**:

    * Firebase Authentication
    * Firebase Firestore (baza danych NoSQL)
* **Narzędzia developerskie**:

    * ESLint & Prettier do formatowania kodu
    * TypeScript do sprawdzania typów

## Instalacja

### Wymagania wstępne

* Node.js (v14 lub nowszy)
* npm lub yarn
* Expo CLI
* Konto Firebase

### Konfiguracja

1. Sklonuj repozytorium:

   ```bash
   git clone https://github.com/adrianczesnowski/react-native-budget-manager-app.git
   cd budget-manager-app
   ```

2. Zainstaluj zależności:

   ```bash
   npm install
   # lub
   yarn install
   ```

3. Utwórz projekt Firebase:

    * Wejdź na [Firebase Console](https://console.firebase.google.com/)
    * Utwórz nowy projekt
    * Skonfiguruj Authentication (Email/Password)
    * Utwórz bazę danych Firestore
    * Zarejestruj aplikację i pobierz konfigurację

4. Utwórz plik `.env` w głównym katalogu projektu i dodaj konfigurację Firebase:

   ```
    EXPO_PUBLIC_API_KEY =
    EXPO_PUBLIC_AUTH_DOMAIN =
    EXPO_PUBLIC_PROJECT_ID =
    EXPO_PUBLIC_STORAGE_BUCKET =
    EXPO_PUBLIC_SENDER_ID =
    EXPO_PUBLIC_APP_ID =
    EXPO_PUBLIC_MEASUREMENT_ID =
   ```

5. Uruchom serwer deweloperski:

   ```bash
   npm start
   # lub
   yarn start
   ```

## Struktura projektu

```
budget-manager/
├── app/                 # Główne ekrany aplikacji z użyciem Expo Router
│   ├── (tabs)/          # Ekrany nawigacji dolnej (Tab)
│   ├── modal            # Modal do dodawania transakcji
│   └── login            # Ekran logowania
├── components/          # Wspólne komponenty UI
├── constants/           # Stałe aplikacji i konfiguracja motywu
├── context/             # React Context providers
│   ├── AuthContext.tsx  # Zarządzanie stanem uwierzytelnienia
│   ├── NetworkContext.tsx  # Zarządzanie stanem sieci
│   ├── DocumentContext.tsx # Zarządzanie dokumentami/plikami
│   └── TransactionContext.tsx # Zarządzanie transakcjami
├── utils/               # Funkcje pomocnicze
│   └── firebase.ts      # Konfiguracja Firebase
└── README.md            # Dokumentacja projektu
```

## Kluczowe funkcjonalności

### Uwierzytelnianie

Aplikacja wykorzystuje Firebase Authentication do zarządzania użytkownikami, umożliwiając:

* Tworzenie konta
* Bezpieczne logowanie
* Usuwanie konta wraz ze wszystkimi danymi

### Zarządzanie transakcjami

Użytkownicy mogą:

* Dodawać transakcje dochodu i wydatków
* Przypisywać kategorie (spożywcze, gastronomia, transport itp.)
* Przeglądać historię transakcji
* Filtrować transakcje według typu (dochód/wydatek)

### Obsługa offline

Jedną z kluczowych funkcji jest solidne wsparcie trybu offline:

* Transakcje utworzone offline są przechowywane lokalnie
* Po przywróceniu połączenia dane są automatycznie synchronizowane z chmurą
* Dane lokalne są priorytetowe dla natychmiastowej aktualizacji UI

### Synchronizacja danych

Aplikacja posiada zaawansowany system synchronizacji:

* Rozwiązywanie konfliktów przy duplikatach lokalnych i chmurowych
* Zapobieganie duplikatom, szczególnie w przypadku transakcji dochodowych
* Synchronizacja w tle po zmianie statusu sieci

## Informacje dla deweloperów

### Zarządzanie stanem

Aplikacja używa React Context API z trzema głównymi kontekstami:

* `AuthContext`: zarządza stanem uwierzytelnienia
* `TransactionContext`: zarządza danymi transakcji i synchronizacją
* `NetworkContext`: śledzi status połączenia z siecią
* `DocumentContext`: zarządza danymi dokumentów

### Integracja z Firebase

* Uwierzytelnianie skonfigurowane z użyciem AsyncStorage
* Firestore przechowuje dane transakcji
* Dwukierunkowa synchronizacja między lokalną pamięcią a Firestore

### Podejście offline-first

Aplikacja została zaprojektowana w duchu podejścia offline-first:

* Wszystkie dane są najpierw zapisywane lokalnie
* Interfejs użytkownika jest aktualizowany natychmiast
* Dane są synchronizowane z chmurą, gdy to możliwe
* Zmiana statusu sieci uruchamia odpowiednią synchronizację
