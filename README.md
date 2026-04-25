### Symulator Ekosystemu: Trawa, Króliki, Wilki
Interaktywna aplikacja webowa symulująca uproszczony łańcuch troficzny przy użyciu zaawansowanego zarządzania stanem oraz paradygmatu programowania funkcyjnego.

### Opis Projektu
Projekt modeluje dynamiczne relacje między trzema gatunkami w zamkniętym ekosystemie. Aplikacja pozwala na obserwację procesów biologicznych takich jak konsumpcja, reprodukcja oraz wpływ losowych zdarzeń środowiskowych na populację.

### Główne mechanizmy:
Łańcuch pokarmowy: Trawa → Królik → Wilk.                                               
Reprodukcja Fibonacciego: Populacja królików przy obfitości pokarmu rośnie zgodnie z ciągiem Fibonacciego.               
Zarządzanie Energią: Każdy organizm posiada zasób energii, który zużywa na przeżycie (metabolizm) i zyskuje poprzez konsumpcję.                   
Zdarzenia Losowe: Każda tura przynosi ryzyko wystąpienia suszy, pożaru, obfitości lub choroby.              

### Stos Technologiczny
React: Interfejs użytkownika.                          
Redux Toolkit: Centralny mechanizm zarządzania stanem (Single Source of Truth).                                    
Programowanie Funkcyjne: Przetwarzanie danych oparte na metodach .map(), .filter() oraz .reduce().                           
CSS: Responsywny i czytelny interfejs.                        

### Architektura Systemu                
Store: Przechowuje aktualny stan populacji, zasobów trawy, historię oraz aktywne zdarzenia.                  
Reducers (Slices): Funkcje czyste przekształcające stan ekosystemu krok po kroku.                   
UI Components: Odpowiadają wyłącznie za wyzwalanie akcji oraz wizualizację danych pobranych selektorami.                             

### Funkcje Aplikacji
Tryb Manualny: Wykonanie pojedynczej tury symulacji.               
Tryb Automatyczny: Uruchomienie ciągłej symulacji z określonym interwałem czasowym.                    
Monitor Zdarzeń: Wyświetlanie informacji o aktualnych anomaliach pogodowych i ich wpływie na populację.              
Historia Ekosystemu: Szczegółowa tabela prezentująca zmiany w populacjach na przestrzeni czasu.                                         

### Instalacja i Uruchomienie
Sklonuj repozytorium:
```
git clone https://github.com/Smiletoomee/GraTurowa
```
Zainstaluj zależności:

```
npx create-react-app symulator
cd .\symulator\
npm install @reduxjs/toolkit react-redux lucide-react 
```

Uruchom aplikację w trybie deweloperskim:
```
npm start
```

Otwórz http://localhost:3000 w swojej przeglądarce.

Projekt zrealizowany w ramach zadania: Symulator Ekosystemu.
