// Aquí van las preguntas basadas en los artículos de Wikipedia (resumidas).
const quizzes = {
  grecia: [
    {
      q: "¿Cuál de estas fue una polis griega destacada?",
      a: ["Esparta", "Cartago", "Roma"],
      c: 0,
    },
    {
      q: "¿Quién es considerado el padre de la filosofía occidental en Grecia?",
      a: ["Sócrates", "Augusto", "Cicerón"],
      c: 0,
    },
    {
      q: "¿Qué guerra enfrentó a Atenas y Esparta?",
      a: ["Guerra del Peloponeso", "Guerras Púnicas", "Guerras Médicas"],
      c: 0,
    },
    {
      q: "¿Qué festivales famosos nacieron en Grecia y eran religiosos y deportivos?",
      a: ["Juegos Olímpicos antiguos", "Ludi romanos", "Toros de Creta"],
      c: 0,
    },
    {
      q: "¿Quién escribió la Ilíada y la Odisea?",
      a: ["Homero", "Virgilio", "Ovidio"],
      c: 0,
    },
    {
      q: "¿Qué figura política fue central en las polis griegas?",
      a: ["Ágora", "Senado", "Cónsul"],
      c: 0,
    },
    {
      q: "¿Qué filósofo escribió “La República”?",
      a: ["Platón", "Cicerón", "Aristóteles"],
      c: 0,
    },
    {
      q: "¿Qué civilización influyó en la arquitectura griega con columnas dóricas, jónicas y corintias?",
      a: ["Grecia", "Roma", "Egipcia"],
      c: 0,
    },
    {
      q: "¿Qué batalla lucharon griegos contra persas en una llanura estrecha famosa?",
      a: ["Termópilas", "Canne", "Maratón"],
      c: 0,
    },
    {
      q: "¿Qué filósofo fue discípulo de Platón y tutor de Alejandro Magno?",
      a: ["Aristóteles", "Sócrates", "Zenón"],
      c: 0,
    },
  ],
  roma: [
    {
      q: "¿Según la leyenda, qué animal crió a Rómulo y Remo?",
      a: ["Loba", "Águila", "Perra"],
      c: 0,
    },
    {
      q: "¿En qué año tradicionalmente se funda Roma (ab Urbe condita)?",
      a: ["753 a. C.", "509 a. C.", "27 a. C."],
      c: 0,
    },
    {
      q: "¿Qué forma de gobierno precedió al Imperio romano?",
      a: ["República", "Monarquía absoluta", "Democracia directa"],
      c: 0,
    },
    {
      q: "¿Qué estructura construyeron los romanos para transportar agua en largas distancias?",
      a: ["Acueductos", "Templos", "Puentes levadizos"],
      c: 0,
    },
    {
      q: "¿Qué emperador dividió el Imperio romano en Occidente y Oriente?",
      a: ["Diocleciano", "Augusto", "Nerón"],
      c: 0,
    },
    {
      q: "¿Cómo se llama la caída simbólica del Imperio Romano de Occidente?",
      a: ["476 d.C.", "1453 d.C.", "800 d.C."],
      c: 0,
    },
    {
      q: "¿Qué fue el Senado en Roma?",
      a: [
        "Órgano asesor de patricios",
        "Asamblea de plebeyos",
        "Ejército profesional",
      ],
      c: 0,
    },
    {
      q: "¿Qué guerras enfrentaron a Roma contra Cartago?",
      a: ["Guerras Púnicas", "Guerras Médicas", "Guerras del Peloponeso"],
      c: 0,
    },
    {
      q: "¿Quién fue el primer emperador romano?",
      a: ["Augusto", "Julio César", "Trajano"],
      c: 0,
    },
    {
      q: "¿Qué lengua hablaban los romanos clásicos?",
      a: ["Latín", "Griego", "Etrusco"],
      c: 0,
    },
  ],
};

// Estado
let currentQuiz = [];
let currentIndex = 0;
let score = 0;

// Baraja preguntas
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Iniciar Quiz de Grecia o Roma
function startQuiz(topic) {
  currentQuiz = quizzes[topic].map((q) => {
    // Copia
    return {
      q: q.q,
      a: [...q.a],
      c: q.c,
    };
  });

  // Barajar el orden de las preguntas
  shuffleArray(currentQuiz);
  currentIndex = 0;
  score = 0;
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("result").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  showQuestion();
}

// Mostrar una pregunta
function showQuestion() {
  if (currentIndex < currentQuiz.length) {
    let qObj = currentQuiz[currentIndex];
    document.getElementById("question").innerText = qObj.q;

    // Mezclamos las opciones también
    let options = qObj.a.map((opt, idx) => ({
      text: opt,
      idx: idx,
    }));
    shuffleArray(options);

    // Guardamos dónde quedó la respuesta correcta después de barajar
    // Buscamos el nuevo índice de la opción correcta
    const correctText = qObj.a[qObj.c];
    const newCorrectIndex = options.findIndex(
      (opt) => opt.text === correctText
    );

    // Actualizamos c al nuevo índice
    qObj.c = newCorrectIndex;

    // Limpiamos área de respuestas y agregamos botones
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";
    options.forEach((optObj) => {
      const btn = document.createElement("button");
      btn.className = "btn";
      btn.innerText = optObj.text;
      btn.onclick = () =>
        checkAnswer(optObj.idx === qObj.c ? optObj.idx : optObj.idx);

      // En realidad, compararemos según el nuevo índice más adelante
      btn.onclick = () => checkAnswer(options.indexOf(optObj));
      answersDiv.appendChild(btn);
    });
  } else {
    endQuiz();
  }
}

// Revisa respuesta
function checkAnswer(selectedIdx) {
  const qObj = currentQuiz[currentIndex];
  if (selectedIdx === qObj.c) {
    score++;
  }
  currentIndex++;
  showQuestion();
}

// Mostrar resultado
function endQuiz() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById(
    "score"
  ).innerText = `Tu puntuación fue ${score} de ${currentQuiz.length}.\n¡Gracias por participar!`;
}

// Regresar
function goHome() {
  document.getElementById("menu").classList.remove("hidden");
  document.getElementById("result").classList.add("hidden");
}
