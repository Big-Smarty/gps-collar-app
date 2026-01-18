# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

# How to run it
- on desktop: `bun run tauri dev`
- on android: `bun run tauri android dev`

# How to build it
- on desktop: `bun run tauri build`
- on android: `bun tauri android build -t aarch64 #moderne Architektur, beispielsweise ARMv8`

# Screenshots
- Disconnected:
![disconnected](https://github.com/Big-Smarty/gps-collar-app/blob/main/assets/disconnected.jpg)

- Connected:
![connected](https://github.com/Big-Smarty/gps-collar-app/blob/main/assets/connected.jpg)

# Kurzdokumentation
#### zentrale Annahmen, Vereinfachungen oder technische Entscheidungen
- es wurde Angenommen dass ein anderer Entwickler sich um die Schnittstelle zum LoRA-Modul am Handy kümmert.
- als Vereinfachung haben wir sowohl dem Nutzer als auch dem Hund Dummy-Standorte gegeben (die Positionserfassung des Nutzers funktioniert bisher nur im Browser, jedoch nicht in der App)
- wir haben uns für Tauri + TS + NextJS + ShadCN + Leaflet entschieden, einfach weil es das technisch modernste und am einfachsten umzusetzende war.

#### tatsächlich angefallener Arbeitsaufwand
- ca. 1 Personentag

#### Reflektion und Vergleich mit User Story
Die User Story nahm an dass wir 7 Personentage brauchen. Dies war jedoch auch in Verbindung mit einem Login-System welches hier schlicht und ergreifend nicht vonnöten ist. Immerhin ist der Sinn eines LoRA-Hundehalsbandes dass man es ohne Internet oder sonstigem nutzen kann. Wenngleich es nicht allzu viel mehr Aufwand gekostet hätte eines mit einzubinden, so muss man noch dazu sagen dass die Einschätzung des Arbeitsaufwandes zu 99% der Fälle immer weit vom eigentlichen Wert abweicht.
