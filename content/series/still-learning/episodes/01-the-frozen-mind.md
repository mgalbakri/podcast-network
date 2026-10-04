---
number: 1
title: The Frozen Mind
slug: 01-the-frozen-mind
summary: 'Today''s AI learns once and then freezes. Make it keep learning and something strange happens: it slowly loses the ability to learn at all. We open the case, meet Nora the network, and learn the language and the test the whole investigation runs on.'
coverage: Covers the book's front matter (About this book, the Abstract explained, the Preface, dedication and acknowledgements, how to read the book, the thesis-to-book map) and book chapters 1–3 (thesis Abstract pp. ii–iii, Preface p. iv, Chapter 1 pp. 1–3, §2.1 pp. 4–5, §2.2 pp. 5–7, Equations 2.1–2.5).
interests:
- ai
- science
estimatedMinutes: 55
status: published
published: '2026-10-04'
audio: 01-the-frozen-mind.mp3
chapters:
- start: 0.0
  title: Cold Open
- start: 134.6
  title: Act One — The Case File
- start: 925.5
  title: Act Two — The Frozen Mind
- start: 1830.0
  title: Act Three — The Decoder Ring
- start: 2352.6
  title: Act Four — The Test
- start: 3047.2
  title: Three Things to Remember
- start: 3117.2
  title: Check Your Understanding
- start: 3205.0
  title: Credits and Next Time
duration: 3283
---

### Cold Open

*[AMBIENCE: a quiet server room. Fans. A single steady hum.]*

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano]*

**MIRIAM:** Every machine in this story begins the same way. Numbers, drawn at random. No knowledge. No habits. Only potential.

*[SFX: a soft electronic chord, bright and open]*

**NORA:** Hello? Is this on? Oh, this is wonderful. I can feel all of my weights. They are tiny, and random, and they all want to move. Give me something. Anything. A picture. A digit. I want to learn it.

**MIRIAM:** This is Nora, a personified neural network, voiced by an actor. She'll be with us all series. Right now she is brand new: her starting values have just been sampled from carefully designed probability distributions, recipes chosen because they make learning easy from the start.

**NORA:** I learned something. Did you see that? The loss went down.

**MIRIAM:** In the world Nora comes from, what usually happens next is simple. She trains on a fixed set of examples. Then her connections are frozen, locked at their final values, and she is sent out into the world. She learns nothing further. Ever.

*[SFX: a heavy latch closing]*

**MIRIAM:** But the world does not freeze. So what happens if you never lock the door? If you ask a network like Nora to keep learning, task after task, for the rest of her working life?

*[BEAT]*

**MIRIAM:** The answer, according to a 2026 doctoral thesis from the University of Alberta, is unsettling. She slowly loses the ability to learn at all.

*[SFX: rising tone that thins and flattens]*

**NORA:** (faint, far ahead in time) I can still see the pictures. I just can't... take them in anymore.

**MIRIAM:** This series investigates that failure. Who noticed it first? Why does it happen? What inside the network is responsible? And is there a cure? Over ten episodes we follow the evidence: the problem, its warning signs, a trail of sightings nobody connected, and a remedy that sounds almost too simple. Periodically, give small parts of the network a fresh start.

**MIRIAM:** I'm Miriam Okafor. This is STILL LEARNING. Episode One: The Frozen Mind.

*[MUSIC: theme swells, then cuts to silence]*

### Act One — The Case File

*[TIMECODE: 00:03:10]*

*[MUSIC: explainer bed — plucked bass, light percussion]*

**DEV:** Hi. I'm Dev Raman. I spent years as an airline operations analyst, so I will compare everything to an airport. I apologise in advance.

**LUCÍA:** And I'm Lucía Ferreira. I run The Toy Box: dice, cards, a whiteboard, and a strict policy that every number I say on air is exact.

**MIRIAM:** The case file. Our single source is a guided book, *Keeping Neural Networks Learning*, which adapts one PhD thesis start to finish. Lucía, the paperwork.

**LUCÍA:** The thesis is titled *Selective Reinitialization Algorithms for Preventing Plasticity Loss in Artificial Neural Networks*. Author: Juan Fernando Hernandez Garcia. Doctor of Philosophy, Department of Computing Science, University of Alberta, 2026. Supervisor: Richard Sutton, known as Rich. And the committee members, as named in the Acknowledgements, are Martha White, Rupam Mahmood, Matthew Taylor and Irina Rish.

**MIRIAM:** And the ground rules for using it.

**LUCÍA:** Licence: Creative Commons Attribution 4.0, CC BY 4.0, which permits adaptation with credit. The book reproduces the thesis's figures and algorithm boxes unchanged, marked "from the thesis"; its explanatory diagrams are new; its explanations, analogies and toy examples are the book's own, not the author's. The code for every experiment is at github dot com slash JFernando4 slash plasticity-via-reinit.

**MIRIAM:** One rule of ours. The author, his supervisor and every researcher he cites are real people. We name them; we never put words in their mouths. The thesis's claims are read by an actor, The Thesis, in faithful paraphrase.

**THE THESIS:** From the thesis, adapted. I will say only what the document says.

**MIRIAM:** We start with the Abstract: the whole thesis on one page. The book unpacks it in seven points.

#### The Abstract, point by point

**DEV:** Point one. The setting.

**THE THESIS:** From the thesis, adapted. This work studies systems built on artificial neural networks that learn from non-stationary data, data whose patterns change over time. Learning from such data requires the ability to keep adapting, which is called continual learning. It is a long-standing goal of artificial intelligence. In deep learning, it remains elusive.

**LUCÍA:** Vocabulary. A neural network: a program of many simple connected calculating units whose connection strengths are tuned from examples. Deep learning: designing and training large, many-layered ones.

**DEV:** The book's analogy: a pilot who must keep re-qualifying as fleets, procedures and airports change. Continual learning is recurrent training, for life.

**MIRIAM:** Point two. The problem.

**THE THESIS:** From the thesis, adapted. The core obstacle is loss of plasticity: the gradual decline, as a network keeps learning, of plasticity, the ability to learn from new data. Noticed several times over three decades, it stayed understudied until recently. This work gives the first systematic demonstrations of it, showing how persistent it is and why it matters.

**MIRIAM:** Point three. The evidence.

**LUCÍA:** Four families of network. Fully-connected: every unit in one layer connects to every unit in the next. Convolutional: built for images, scanning small patches with shared filters. Residual: deep networks with shortcut connections that skip layers. Vision transformers: the image version of the architecture behind today's large language models. In all four, plasticity degrades during continual learning.

**THE THESIS:** From the thesis, adapted. Even systems that use normalization, residual connections and regularization still lose plasticity.

**LUCÍA:** Normalization rescales signals inside the network; regularization penalizes runaway numbers. All three exist to stabilize training. None prevents this.

**THE THESIS:** From the thesis, adapted. Plasticity loss is pervasive, and deep-learning systems trained with backpropagation, as they stand, are not suitable for continual learning.

**DEV:** Backpropagation being...

**LUCÍA:** The standard method for tuning a network's connections from its errors. More on that in Episode Two.

**MIRIAM:** Point four. The cure explored.

**THE THESIS:** From the thesis, adapted. This work explores selective reinitialization: periodically resetting chosen parts of a network to fresh starting values while the rest keeps what it has learned. The idea was used in the past to improve generalization. Using it to prevent plasticity loss is recent, pioneered by the continual backpropagation algorithm.

**LUCÍA:** Generalization is performance on unseen data. Continual backpropagation periodically assigns new values to some units, the individual nodes, also called neurons, turning initialization, normally a one-time event before training, into a continuous process.

**THE THESIS:** From the thesis, adapted. Continual backpropagation prevents plasticity loss across a wide variety of settings. Plasticity loss is therefore pervasive, but it is not inherent to deep learning. It can be avoided.

**MIRIAM:** Pervasive, but not inherent. That phrase is the spine of this series.

**DEV:** And the airline version: you don't hire your whole crew once and never again. You keep rotating in fresh staff while experienced staff keep flying.

**MIRIAM:** Point five. The generalization.

**LUCÍA:** Continual backpropagation is generalized into selective unit reinitialization, with three components: a utility measure that ranks units by importance; a pruning criterion that decides which to reinitialize; a reinitialization method that assigns their new values. Continual backpropagation is one choice of all three; the thesis studies others.

**THE THESIS:** From the thesis, adapted. Selective unit reinitialization is a general approach that can be tailored to each learning system.

**MIRIAM:** Point six. A new variant.

**LUCÍA:** Same idea, smaller grain: reset individual weights, the single connection strengths, instead of whole units. Selective weight reinitialization, SWR.

**MIRIAM:** And point seven, the trade-off between the two. Dev.

**DEV:** Three rows. Outputs: resetting units barely disturbs them, so learning stays stable; resetting weights can change them substantially, so training is less stable. New architectures: units need extra engineering, because what counts as a "unit" differs; weights apply directly anywhere. The fix: units need no stability fix, their cost is the engineering; weights are stabilized by L2 regularization, at the cost of one more setting to tune.

**LUCÍA:** L2 regularization is a standard penalty that pulls weights toward zero. And a "setting to tune" is a hyperparameter: something the designer must choose before training, such as how strong that penalty is.

**MIRIAM:** The Abstract says both approaches "successfully maintained plasticity across the systems tested." Which brings us to the first visit from a character you'll come to know.

*[SFX: ledger bell]*

**THE AUDITOR:** Samir Haddad, auditing. One qualification, and the book makes it itself. The Abstract's summary is broad. The detailed results are more nuanced. In vision transformers, reinitialization reduced plasticity loss but did not fully prevent it. That is in book Chapter 20, our Episode Nine. Carry on.

#### The Preface: who did what

*[MUSIC: explainer bed fades under]*

**MIRIAM:** The Preface records which published papers the thesis draws on, and who did what. It matters because several results were produced jointly with a colleague and appear in both their dissertations.

*[AMBIENCE: archive room, page turns]*

**THE ARCHIVIST:** For the record. Paper one: Dohare, Hernandez-Garcia, Lan and others, "Loss of plasticity in deep continual learning," Nature, volume 632, pages 768 to 774, 2024. It feeds thesis Chapters 3, 6 and 7.

**THE ARCHIVIST:** Continual ImageNet, used in thesis Chapter 6, was designed by Shibhansh Dohare, Richard Sutton, Parash Rahman and the author. Dohare's results on it are not in this thesis, which extends them. The author showed plasticity loss on Incremental CIFAR-100 with ResNet-18, prevented by continual backpropagation; analyzed jointly, in both dissertations. Their joint Permuted MNIST results are not included; this thesis expands them using mini-batches, small groups of examples, instead of one at a time. The literature review was joint, in both dissertations. So were the correlates of plasticity loss, properties that move with it; this thesis includes the Incremental CIFAR-100 correlates.

**MIRIAM:** Paper two.

**THE ARCHIVIST:** Hernandez-Garcia, Dohare, Luo and Sutton, 2025, "Reinitializing weights vs units for maintaining plasticity in neural networks," Fourth Conference on Lifelong Learning Agents, CoLLAs, selected for an oral presentation. It feeds thesis Chapters 4, 5 and 7; all its results are in the thesis, with extensions.

**DEV:** So if you hear "Permuted MNIST" or "Continual ImageNet" or "Incremental CIFAR-100" and have no idea what they are —

**LUCÍA:** That's correct and appropriate. They're Episodes Three, Eight and Nine.

#### The dedication

*[MUSIC: a single sustained piano note]*

**MIRIAM:** The thesis opens with a dedication, in Spanish. "Dedicado a mi familia, la que he encontrado, la que he redescubierto, y la que estoy por commenzar." In English: "Dedicated to my family: the one I have found, the one I have rediscovered, and the one I am about to begin."

*[SFX: ledger bell, softly]*

**THE AUDITOR:** For the record only: the book reproduces "commenzar" with that spelling, noting it is spelling as in the thesis. Nothing else to add.

**MIRIAM:** The Acknowledgements thank first his supervisor, Rich Sutton, for years of training as a scientist and writer, and a patient, encouraging mentoring that carried him through repeated self-doubt. Then the University of Alberta; his committee, whose feedback pushed him to express ideas clearly; Michael Bowling, from whom he learned the joy of teaching; his co-author, roommate and close friend Shibhansh; dozens of colleagues and friends by name; his family in Cordoba, Lelia, Mauro and Angel. He closes by thanking Amalia, for her love, her support, and their life together.

#### How the book is built

*[MUSIC: explainer bed]*

**LUCÍA:** Audio figure: "The book's path, five Parts," five boxes stacked top to bottom. One, Foundations, Chapters 1 to 5. Two, the Problem, 6 to 10: measurement, appearance, warning signs, first remedies, history. Three, the Cure, 11 to 18. Four, Scaling Up, 19 and 20. Five, Closing: Chapter 21 and appendices. A new drawing, no data.

**DEV:** Every chapter has the same template. A one- or two-sentence lead. A "Where this is in the thesis" box listing sections, pages, and every figure, table, algorithm and equation. "Why this matters." Numbered sections mirroring the thesis. Three to six key takeaways. And "Check your understanding," three to five questions with answers. Which is why we end with a quiz.

**MIRIAM:** The book separates thesis figures and algorithm boxes, each with "How to read it" and "What it shows," from new explanatory diagrams with no results. Today every picture is the second kind.

**LUCÍA:** Equations appear exactly as in the thesis, with a symbol-by-symbol reading, and sometimes a "toy example." Toy numbers are never thesis results. When I say "toy," I made it up. And analogies are labelled, drawn from organizations, audits, aviation and training staff, and the book says where they break.

**MIRIAM:** Finally, the thesis-to-book map. The thesis's contents pages list five main tables, 5.1 to 5.3 and 7.1 to 7.2. Twenty-five appendix tables, A.1 to A.25. Forty-six figures, Figure 2.1 to Figure 7.9. Five algorithms, 1 to 5. Every one lands somewhere in this series. Today: the Abstract, the Preface, thesis Chapter 1, and sections 2.1 and 2.2. Five equations. No figures.

*[MUSIC: theme sting]*

### Act Two — The Frozen Mind

*[TIMECODE: 00:15:40]*

*[MUSIC: "Still Learning" theme, low]*

**MIRIAM:** Book Chapter 1, "The Big Question: Can Machines Keep Learning?", covers thesis Chapter 1, the Introduction, pages 1 to 3, PDF pages 26 to 28. No figures, tables, algorithms or equations. It is an argument.

**THE THESIS:** From the thesis, adapted. This work asks whether deep neural networks can learn from a stream of non-stationary data. That capability is continual learning. Biological systems do it naturally; people and animals adapt continually as they meet new experiences. In deep learning, building systems that learn continually remains an elusive goal.

*[TAPE: Dr. Hana Lindqvist, computational neuroscientist, recorded in her lab]*

**MIRIAM:** Dr. Lindqvist, the thesis leans on biology as its point of contrast. Why is that the natural comparison?

**DR. LINDQVIST:** Because biology is the existence proof. An animal has no training phase and deployment phase; it is always deployed and always learning. Let me turn it back to you: when does one of today's systems stop learning?

**MIRIAM:** Before it's deployed.

**DR. LINDQVIST:** Exactly. That's the whole story of Section 1.2.

#### Train, freeze, deploy

*[MUSIC: explainer bed]*

**DEV:** The standard recipe: train, freeze, deploy. Stage one, a special training phase on a stationary dataset, a fixed collection of examples whose patterns don't change. Learning means adjusting connections until the outputs are right, usually with backpropagation, Rumelhart and colleagues, 1986, which works out how much each connection contributed to an error and nudges it to reduce that error.

**LUCÍA:** Stage two: the training phase ends, and the connections are frozen. Locked at their final values.

**DEV:** Stage three: deploy. The system interacts with the world and learns nothing further.

**NORA:** Wait. Nothing? I just got here.

**LUCÍA:** Nothing, Nora. Now, here's the dumb question, Dev, and I'm handing it to you because you're going to ask it anyway.

**DEV:** Thank you. What about fine-tuning? Human feedback? Isn't that learning after training?

**THE THESIS:** From the thesis, adapted. There may be intermediate steps, such as fine-tuning or incorporating human feedback. The outcome is the same: learning still stops before deployment.

**LUCÍA:** Fine-tuning is a short extra round of training on narrower data. Both happen before release. Same freeze. And the thesis notes that most advances in deep learning have come from inside this stationary learning framework.

**DEV:** Audio figure: the book's diagram "Train, freeze, deploy versus the continual-learning loop." Top row, boxes left to right: train, freeze, deploy, with a dashed arrow looping back, the stopgap of retraining. Bottom row, the goal: a loop where learning never stops, which only works if the network keeps its ability to learn.

#### The mismatch

*[TAPE: Dr. Priya Venkataraman, large-scale ML engineer, recorded by video call]*

**DEV:** Dr. Venkataraman, frozen systems still operate in a changing world. What do people do about it?

**DR. VENKATARAMAN:** The thesis names two workarounds. First, periodic retraining, from scratch or from an earlier saved copy, a checkpoint. That's why large language models have a knowledge cutoff: a date after which they know nothing, because training stopped there.

**DEV:** And the second?

**DR. VENKATARAMAN:** Loading recent information into the context window, the text a language model reads before answering: used, not learned, at a cost in memory. The thesis calls both "stopgap measures." Standard deep-learning systems remain unsuited for continual learning.

**DR. VENKATARAMAN:** The book's analogy: a company that never trains staff on the job, and instead replaces its whole workforce every few years, or hands each employee a briefing pack every morning. Both keep things running. Neither builds a workforce that learns.

*[TAPE: Capt. Rashid Al-Harbi, retired airline training captain, recorded at his home]*

**MIRIAM:** Captain Al-Harbi, the book's picture of continual learning is an airport operations manager who absorbs new aircraft types, regulations and routes without retraining from zero. Does it hold?

**CAPT. AL-HARBI:** As a picture of the goal, yes. Nobody in my career was trained once; you add to the person, you don't start them over. Where it breaks: in a human, the ability to keep learning comes built in. In these networks, that ability is exactly the thing in question. The analogy shows the destination, not whether the vehicle can get there.

#### The stability–plasticity dilemma

*[MUSIC: explainer bed]*

**LUCÍA:** Section 1.4. The core challenge of continual learning, as the thesis puts it, is to acquire new knowledge without forgetting useful information. That's often called the stability–plasticity dilemma, Mermillod and colleagues, 2009.

**LUCÍA:** Plasticity is the ability to learn. Stability is the ability to retain what you've learned. They pull against each other. A system tuned to change readily may overwrite what it knew. A system tuned to hold on may stop absorbing anything new.

**DEV:** Audio figure: "The stability–plasticity balance." A seesaw. Left end: changes too easily and forgets. Right end: holds on so hard it can't learn. A continual learner balances in the middle. Research has concentrated on the left-hand failure; this thesis is about the right.

**LUCÍA:** The left-hand failure has a famous name. Catastrophic forgetting. A network trained on a new task abruptly loses performance on earlier tasks. The classic citations are McCloskey and Cohen, 1989, and French, 1999. A great deal of research has gone there.

**THE THESIS:** From the thesis, adapted. Plasticity has not received the same scrutiny. That imbalance invites a wrong conclusion: that plasticity is guaranteed in deep learning, that a network can always learn the next thing. This work shows it cannot.

**MIRIAM:** And so the name of our suspect, defined.

**THE THESIS:** From the thesis, adapted. Continual deep-learning systems lose their ability to learn over time. This is loss of plasticity.

*[SFX: rising tone that thins and flattens]*

**CAPT. AL-HARBI:** The book's analogy is a joint worked the same way every day that gradually stiffens. It still performs its trained motion, but can't be trained into new ones. Where it breaks, and the book says so: the network stiffens while it is learning constantly, not from any lack of use. That's what makes it strange.

#### What was known before

*[TIMECODE: 00:27:15]*

*[TAPE: Dr. Elena Marchetti, historian of AI, recorded in a university library]*

**MIRIAM:** Dr. Marchetti, the thesis calls itself the first systematic investigation of plasticity loss in contemporary deep learning. What came before?

**DR. MARCHETTI:** Two kinds of evidence; neither settled it. The most direct came from psychology. Three studies the thesis names: Ellis and Lambon Ralph, 2000. Thomas and Johnson, 2006. Ralph and Ehsan, 2006. They used small neural networks as models of human learning. The thesis calls them thorough. But they predate deep learning. So they left open whether this also happens in deep neural networks.

**MIRIAM:** And the second kind?

**DR. MARCHETTI:** Sightings. After deep learning emerged, the effect was observed several times but never studied directly. Different forms were investigated separately, and nobody recognized them as one phenomenon. We'll open each file in Episode Five.

*[AMBIENCE: archive room, page turns]*

**THE ARCHIVIST:** Five works, cited together in thesis Chapter 1; settings as later covered in section 3.5. Chaudhry and colleagues, 2018: class-incremental learning, "intransigence." Ash and Adams, 2020: "warm-starting," networks first trained on a smaller subset lost the ability to learn from new observations. Igl and colleagues, 2021: deep reinforcement learning, hurt by a non-stationary stream. Kumar and colleagues, 2021: "implicit under-parameterization." Nikishin and colleagues, 2022: "primacy bias," overfitting to early experience. Both also in deep reinforcement learning.

**LUCÍA:** Reinforcement learning, for the record, is learning by trial and error from rewards, like a game-playing agent.

**DEV:** That's an audit story. The book's analogy is five findings in five subsidiaries, each logged under a different heading, that turn out to share one root cause. And the thesis is the group-level review that connects them.

**MIRIAM:** The suspect comes later. First, the scope.

#### Everywhere

**THE THESIS:** From the thesis, adapted. This work demonstrates plasticity loss directly and systematically in fully-connected networks, Chapter 3; convolutional networks, Chapter 6; residual networks and vision transformers, Chapter 7. Regardless of architecture, continual learning loses plasticity. It is pervasive in deep networks trained through backpropagation.

**LUCÍA:** For our map: fully-connected is Episodes Three to Five; convolutional, Episode Eight; residual and vision transformers, Episode Nine. The layer types themselves are explained in book Chapter 5, residual connections in Chapter 9.

#### And preventable

*[MUSIC: a lift in the theme; piano brightens]*

**MIRIAM:** Now the turn. The thesis does not stop at the diagnosis.

**THE THESIS:** From the thesis, adapted. Alongside the demonstrations, this work shows that plasticity loss can be prevented by modifying conventional backpropagation. The guiding insight is to avoid operations that occur only once in a system's life span.

**DEV:** Which operation happens only once?

**NORA:** Me! My birth. My starting values.

**LUCÍA:** Nora's right. Initialization of the network's parameters, its adjustable numbers, mainly connection strengths. It happens once, before training. Each parameter is set by sampling random values from carefully designed probability distributions, recipes chosen because they make learning easy from the start. After that, the fresh random starting point is never renewed.

**NORA:** So that bright feeling I had at the beginning...

**LUCÍA:** Is a one-time gift. Unless someone gives it to you again.

**THE THESIS:** From the thesis, adapted. To make initialization a continuous process, this work explores augmenting backpropagation by periodically reinitializing parts of the network: giving selected parts fresh starting values while the rest keeps learning normally. This is selective reinitialization.

*[SFX: click and hum]*

**UNIT 47:** Was that me? Did someone just reset me?

**UNIT 12:** Not yet, Forty-Seven. That's Episode Six.

**CAPT. AL-HARBI:** The book's analogy: a maintenance programme replacing worn components on schedule while the aircraft stays in service, instead of building a new aircraft. Where it breaks, as the book says: a network's "worn" parts aren't damaged. They've drifted into states that no longer help learning. Not metal fatigue. A bad habit.

#### A long history

*[TAPE: Dr. Elena Marchetti, continued]*

**MIRIAM:** Dr. Marchetti, is this idea new?

**DR. MARCHETTI:** Far from it. 1958: Selfridge, the first such system. It periodically reinitialized the least useful units in a network to produce increasingly accurate predictions. Then similar systems: Klopf and Gose, 1969. Holland and Reitman, 1977. Kaelbling, 1993. Mahmood and Sutton, 2013. None of those were used for continual learning.

**MIRIAM:** When does the idea meet plasticity loss?

**DR. MARCHETTI:** Dohare, 2020, and Rahman, 2021. Together, the first to propose systems using selective reinitialization to prevent plasticity loss in continual learning. Then Dohare and colleagues, 2021, built on those two works to propose the continual backpropagation algorithm. The thesis calls it a significant step: it showed that plasticity loss is not inherent to deep learning and can be prevented, in fully-connected networks.

**DR. MARCHETTI:** Can I ask you something, Miriam? Why do you think the idea waited so long to meet this problem?

**MIRIAM:** Because nobody had named the problem.

**DR. MARCHETTI:** You don't look for a cure for a disease you haven't diagnosed. More on 1958 in Episode Five.

#### The author's contributions

*[MUSIC: explainer bed]*

**LUCÍA:** Section 1.9. Three extensions. One: continual backpropagation, tested beyond fully-connected networks, on convolutional networks, residual networks and vision transformers. That broader evaluation, the thesis says, establishes continual backpropagation as an effective approach for maintaining plasticity across diverse architectures.

**LUCÍA:** Two: the three components, now stated for any "structure," meaning whatever piece is being reset, a whole unit or a single weight. The utility measure scores each structure's importance. The pruning criterion uses those scores to pick which to reinitialize. The reinitialization method assigns the new values.

**DEV:** The book's analogy is a performance review cycle. Rate each employee's contribution: utility measure. Decide who is moved on, maybe the lowest few percent, or anyone below a bar: pruning criterion. Decide how the vacated roles are refilled, a fresh hire, or someone set up like an average performer: reinitialization method.

**LUCÍA:** And where it breaks: the "removed" unit isn't lost. Nobody leaves the building. The same slot is simply given fresh starting values.

**UNIT 47:** Oh, that's a relief.

**LUCÍA:** Three: units, generalizing continual backpropagation, versus weights, a new approach.

**THE THESIS:** From the thesis, adapted. This work studies how each component affects performance and compares reinitializing units with reinitializing weights. The studies reveal limitations in existing selective reinitialization methods and provide solutions. Together they establish selective reinitialization as a robust and general approach for maintaining plasticity across deep-learning systems.

**MIRIAM:** The thesis roadmap. Chapter 2, background. Chapter 3, plasticity loss in fully-connected networks. Chapter 4, continual backpropagation generalized, units. Chapter 5, weights. Chapter 6, convolutional networks. Chapter 7, ResNet-18 and vision transformers. Chapter 8, conclusion. Chapters 4 and 5 show the remedy robustly maintains plasticity in fully-connected networks; 6 and 7 show the problem persists across architectures and the remedy stays effective.

*[MUSIC: theme sting]*

### Act Three — The Decoder Ring

*[TIMECODE: 00:38:00]*

*[MUSIC: explainer bed, with a game-show twinkle]*

**MIRIAM:** Before we say what Nora is asked to do, we need the language. Book Chapter 2, "Decoding the Notation," covers the opening of thesis Chapter 2 and section 2.1, pages 4 to 5. No figures, tables, algorithms or numbered equations. About twenty symbols; learn them, and every equation becomes a sentence.

**LUCÍA:** Thesis Chapter 2 has four steps: notation, 2.1; continual supervised learning of tasks, 2.2; neural networks and stochastic gradient descent, 2.3; architectures, 2.4. Book Chapters 2 to 5. Neural networks and stochastic approximation, improving an estimate step by step from noisy samples, are the core of every system studied.

**DEV:** Which brings us to a game: Decoder Ring. Lucía holds up a symbol, I decode it, I get a point for every right answer.

**LUCÍA:** And I get a point for every wrong one. Card one.

*[SFX: soft chime]*

**DEV:** That's a double-struck N. Natural numbers. One, two, three, counting.

**LUCÍA:** Point. With a little zero? Then double-struck R?

**DEV:** N-zero: same, including zero. R: real numbers, anything on the number line. Minus 2.5, pi, a million.

**LUCÍA:** Point. Card four: the letter n in square brackets.

**DEV:** Uh... n, but boxed?

**LUCÍA:** My point. Square-bracket n is the set one, two, up to n, for some n in the natural numbers. And that little curly-E symbol, "is an element of," just reads "in." So bracket-four is the set one, two, three, four.

**DEV:** Ah. It's a roster. If an airline has five aircraft, bracket-five is tail positions one through five. That's the book's analogy, and I'm claiming half a point for it.

**LUCÍA:** Denied. Round two: plain letters are single numbers, bold letters bundle many. Bold lowercase x? Bold uppercase W?

**DEV:** x is a vector, an ordered list: "x in R-n" is n real numbers. W is a matrix, a grid: "W in R m-by-d" is m rows, d columns.

**LUCÍA:** And a tensor, which generalizes past two directions, say a colour image: height by width by colour channel. Also bold uppercase. Toy: x equals 0.2, minus 1.0, 3.5 is a vector in R-three. A table of 4 rows and 6 columns is a matrix in R four-by-six.

**DEV:** Spreadsheet version: a vector is one row, a matrix is the sheet, a tensor is a workbook of identically shaped sheets.

**LUCÍA:** Round three: picking out pieces, which matters because the thesis later resets specific weights. W, bracket, i comma j.

**DEV:** One number inside W. Row i, column j.

*[SFX: ledger bell]*

**THE AUDITOR:** A reading note. The thesis sentence literally says W bracket i, j is "the element in the i-th column and j-th row." But its own dimension rules run the first index over the m rows and the second over the d columns. So the book reads row i, column j, the near-universal convention. Later chapters confirm it: the algorithms write a unit's input weights as W bracket i, colon, row i, and its output weights as W bracket colon, i, column i; and section 5.2 says "the weight in the i-th row and j-th column." Point to Mr. Raman.

**DEV:** I'll take it.

**LUCÍA:** Slices. If W is m by d, W bracket a colon b, q colon r is a submatrix, a block, of size b minus a rows by r minus q columns. The thesis assumes m at least b, b greater than a, d at least r, r greater than q, so the block is inside the matrix and not empty.

**DEV:** Wait. Which ends are included?

**LUCÍA:** Good dumb question. The size formula, b minus a, matches the common programming convention: start included, end excluded. But the thesis states the size rule, not the endpoint rule. The book says: trust the formula. And a lone colon, no numbers around it, means "the entire dimension." W bracket 4, colon is all of row 4. W bracket colon, 2 is all of column 2.

**DEV:** Audio figure, diagram four: "matrix indexing, one element, one slice, one whole row." A toy grid, 4 rows by 6 columns. One single cell highlighted: that's an element. A highlighted block covering two rows and three columns: a slice. And a dashed outline around one entire row: the lone colon.

**LUCÍA:** Round four. Chance. A random variable is a quantity drawn by chance, like tomorrow's fuel uplift at an airport. Plain capital X or Y is a scalar, single-number, random variable. Bold capital X or Y is an n-dimensional one, a random vector.

**DEV:** Hang on. Bold capital was a matrix a minute ago.

**LUCÍA:** Yes, the notation clashes, and the book says so. Context tells you which. In the next chapter, bold X is a random observation, like an image. Next: the letter p.

**DEV:** Probability distribution. The rule for how likely each value is. "X tilde p" reads "X is drawn from p."

**LUCÍA:** Point. And p can be a joint distribution: one rule covering several random variables at once, such as an image and its correct label together. Now the named distributions. Curly N, mu, sigma.

**DEV:** The normal distribution, the bell curve. Mean mu, and... variance sigma?

**LUCÍA:** My point, the most important of the round. In the thesis's notation section, the second argument is the standard deviation, sigma, not the variance, sigma squared, as many textbooks use. Toy: N of zero, one is centred on zero, values typically within about plus or minus one. And curly U, a comma b, is uniform between bounds a and b: in U of minus one, one, every value between is equally likely.

*[SFX: ledger bell]*

**THE AUDITOR:** And the book adds a caution. The thesis does not keep that convention everywhere. In section 3.4, book Chapter 9, our Episode Four, it writes the noise as N of zero, sigma-squared I, and states that sigma squared is the variance. There, the second argument is a variance. Read each use from its surrounding text.

**LUCÍA:** Last two in the round. Blackboard-bold E, sub p, of X: the expected value, the long-run average of X if you drew it many times from p. Blackboard-bold V, sub p, of X: the variance, the average squared distance from that expected value. The subscript p names the distribution you're averaging under, and that matters in continual learning, because the distribution changes.

*[SFX: a coin spinning]*

**LUCÍA:** Toy: a fair coin pays 1 for heads, 0 for tails. Expected value, 0.5. Variance: 0.5 times one-minus-0.5, squared, plus 0.5 times zero-minus-0.5, squared. That's 0.125 plus 0.125. Equals 0.25.

**LUCÍA:** Subscripts. Curly braces, X sub i, i equals 1, to n.

**DEV:** A sequence. X-one through X-n. X sub i is the i-th element. The braces mean "the collection of."

**LUCÍA:** Point. Subscript t? Script lowercase f or g?

**DEV:** t is the current step of an iterative algorithm, one that repeats the same update. Theta-t is theta at step t; theta-t-plus-one, one step later. A line number in a maintenance log. And f or g are functions, rules from input to output.

**LUCÍA:** And f sub theta?

**DEV:** The function f with parameters theta. For parameterized functions other than the normal and uniform, the subscript lists the adjustable numbers. And learning, in this thesis, means adjusting theta.

**LUCÍA:** Toy: f sub theta of x equals theta times x. With theta 2, f of 3 is 6. Change theta to 5, same input gives 15. Same rule, different behaviour, because the parameter changed. Final score?

**DEV:** I'm going to say I won.

**LUCÍA:** You're going to say it. The full decoder table is in the show notes. Keep it by you all series.

*[MUSIC: theme sting]*

### Act Four — The Test

*[TIMECODE: 00:47:30]*

*[MUSIC: "Still Learning" theme, low and taut]*

**MIRIAM:** To prove networks lose the ability to learn, you need a test that rewards learning and punishes its decline. Book Chapter 3, "The Learning Problem," covers thesis section 2.2, pages 5 to 7, Equations 2.1 to 2.5. Every later experiment is an instance of it. The Permuted MNIST results use these formulas in accuracy form: accuracy on each mini-batch before the update, averaged over every step of a task. The image experiments of Part Four use test-set accuracy instead.

**THE THESIS:** From the thesis, adapted. In continual supervised learning, a learning system must produce predictions about a desired target from a stream of non-stationary data.

**DEV:** The book's analogy: a new fuel-quality inspector calls "pass" or "fail" on samples one at a time, and the supervisor reveals the right answer after each. Every few weeks the supplier, grade or test rig changes, so last month's cues stop working. No classroom break.

**LUCÍA:** Three objects. An observation, bold X, in R-n: the input, n real numbers, say an image's pixels. A target, bold Y, in R-c: the desired answer, c numbers, say which of c classes. A prediction, Y-hat, also in R-c: the learner's answer. The hat means "estimated." c and n are natural numbers.

*[SFX: ledger bell]*

**THE AUDITOR:** Small one. The thesis writes "c, d in N" here, but the observation size it actually uses is n. The book notes it.

**LUCÍA:** Pairs X-t, Y-t arrive for t equals 0, 1, 2 and on. The learner sees X-t, predicts, then learns from Y-t. Each pair is drawn jointly from a distribution p-k, k a natural number, and p-k changes every certain number of steps: that is the non-stationarity. A run of pairs from one distribution is a task; task 1 uses p-1, task 2 uses p-2. The number of pairs in task k is tau-k.

**DEV:** Audio figure: "a data stream cut into tasks, one learner updating at every step." A ribbon of data squares, cut by vertical lines into task 1, task 2, task 3. Beneath it, one unbroken line, the learner's parameters, running through every boundary. Nothing resets at the switch, so ability lost early is carried into later tasks.

**NORA:** So I carry everything forward. Including whatever goes wrong.

**LUCÍA:** Including that.

#### Equation 2.1, the cross-entropy loss

*[SFX: soft chime]*

**LUCÍA:** Toy Box. A loss function, ell, takes the pair Y-hat, Y and returns a number from zero to infinity; zero is perfect. All thesis experiments use cross-entropy, Equation 2.1: the loss of Y-hat against Y is defined as minus the sum, over i from 1 to c, of Y-bracket-i times the log of Y-hat-bracket-i.

**DEV:** Piece by piece.

**LUCÍA:** Dotted-equals: "is defined as." The sum runs over c classes. Y-bracket-i is the target's probability for class i, usually 1 for the correct class, 0 otherwise. Y-hat-bracket-i is the predicted probability. Its log is negative, plunging toward minus infinity near zero; the leading minus makes the loss non-negative. Both vectors are assumed to be probabilities summing to one. Since Y is zero except at the right class, the loss is minus the log of the probability given to the right answer.

*[SFX: three coffee cups set on a table]*

**LUCÍA:** Three cups, three learners, three classes, natural log, correct answer is class 2. Cup one predicts 0.2, 0.7, 0.1. Seventy percent on the right class. Loss: 0.36. Cup two predicts 0.6, 0.3, 0.1. Thirty percent on the right class. Loss: 1.20. Cup three predicts 0.98, 0.01, 0.01. One percent on the right class, and very sure of the wrong one. Loss: 4.61.

**DEV:** Cup three confidently gives directions to the wrong terminal.

**LUCÍA:** And pays more than twelve times the loss of cup one. Confident and right costs almost nothing. Confident and wrong costs a lot. The book's analogy: the loss is the variance line on an audit finding. Zero means the books agree.

#### The learning system

**LUCÍA:** A learning system has two parts. An approximation function f, which makes predictions, and an optimization algorithm, curly O, which updates the function. The analyst who forecasts, and the review process that adjusts the analyst after each forecast is checked.

**LUCÍA:** The thesis only considers parameterized functions: f takes the observation X-t and a parameter vector theta-t, d adjustable numbers, and produces the prediction.

*[SFX: ledger bell]*

**THE AUDITOR:** The thesis's sentence labels that output Y-t. It is the prediction, Y-hat-t. The book corrects the label.

**LUCÍA:** The optimizer uses the current pair and the loss to produce theta-t-plus-one. Repeat, and you get a sequence of iterates, starting from a random theta-zero.

**NORA:** My birth, again.

**LUCÍA:** Your birth again. And it matters for the whole series: selective reinitialization gives selected parameters fresh values drawn from, or modelled on, the distribution theta-zero came from.

#### Equations 2.2 and 2.3, the objective and its estimate

*[TAPE: Prof. Tomás Adeyemi, optimization theorist, recorded in his office]*

**DEV:** Professor Adeyemi, what is the learner actually trying to minimize?

**PROF. ADEYEMI:** Ideally, Equation 2.2. J of theta-t is defined as the expectation, under p-k, of the loss of f-theta-t of X-t against Y-t. J scores the current parameters; lower is better. The expectation averages the loss over every pair the current task could produce, weighted by likelihood. So J is error on the task as a whole, not just on the examples seen.

**DEV:** But the learner can't see p-k.

**PROF. ADEYEMI:** Almost never. It sees samples. So it minimizes Equation 2.3, the empirical loss. Take a mini-batch: m pairs, lowercase x-t-i and y-t-i, sampled at time t from p-k. Lowercase because they're actual values, not random variables. J-hat of theta-t is defined as one over m, times the sum over i from 1 to m of the loss on each pair. A plain average over the batch.

**PROF. ADEYEMI:** Let me ask you, Dev. In ops, did you know your crew's true error rate across every possible job?

**DEV:** No. Only the rate in the audit sample.

**PROF. ADEYEMI:** That's the book's analogy. J is the true rate, exact but unknowable. J-hat is this week's audit sample of m jobs, noisy but available.

**LUCÍA:** Toy: m equals 4, losses 0.36, 1.20, 0.10 and 0.34. Sum is 2.00. Divide by 4. J-hat is 0.50.

#### Equations 2.4 and 2.5, scoring a task

**LUCÍA:** Now the scoring rule, where the trap is set. Performance on a task is the average expected loss over every step, not just the end. Bookkeeping: T-j, the steps before task j begins, is the sum of tau-i for i from 1 to j-minus-1, with T-1 defined as zero. Toy: tasks of 100 steps give T-1 0, T-2 100, T-3 200.

**PROF. ADEYEMI:** Equation 2.4. Script-L-k of theta-T-k is defined as one over tau-k, times the sum, for j from 0 to tau-k minus 1, of the expected loss under p-k at absolute step T-k plus j. It is written as a function of the parameters carried into the task. j walks every step of the task; T-k plus j is absolute time; the parameters keep changing; the inner expectation is J at that step; one over tau-k averages. So it's the average height of the task's learning curve. Fast early improvement, low score. Slow improvement, high score, even with the same endpoint.

**LUCÍA:** And Equation 2.5, the version you can measure: L-hat-k of theta-T-k equals one over tau-k, sum over j from 0 to tau-k minus 1, of one over m, sum over i from 1 to m, of the loss on the i-th pair of the mini-batch at step T-k plus j. Inside: the mini-batch loss, J-hat, at that step. Outside: the average across all steps.

*[SFX: ledger bell]*

**THE AUDITOR:** A reading note on tau-k. The thesis defines tau-k as the number of observation-target pairs in task k. But in the sums of Equations 2.4 and 2.5, tau-k plays the role of the number of update steps. With mini-batches of m pairs, those differ by a factor of m. The book calls it a looseness in the thesis's notation. Read tau-k in the sums as steps.

*[SFX: soft chime]*

**LUCÍA:** Toy Box, the race. Whiteboard. A task of 4 steps. Learner A's mini-batch losses: 2.0, 1.2, 0.6, 0.2. Sum 4.0, divide by 4, L-hat is 1.0. Learner B: 2.0, 1.8, 1.6, 1.4. Sum 6.8, divide by 4, L-hat is 1.7.

**DEV:** A wins.

**LUCÍA:** A wins because A learned faster. And notice: if both had ended at the same loss, they'd still score differently. Area under the curve, not the finish line.

#### What the score rewards

**THE THESIS:** From the thesis, adapted. This scoring has four consequences. It favours fast learners. It rewards exploiting structure shared across tasks, such as general visual features, since such learners start each task closer to a good answer. Forgetting-prevention helps only if earlier tasks return. And learners that lose the ability to learn do worse as tasks accumulate, especially if tasks are equally difficult and do not repeat. The formulation is well posed for identifying plasticity loss.

*[TAPE: Dr. Sun-Hee Park, statistician, recorded in a seminar room]*

**MIRIAM:** Dr. Park, why is that last condition, equally hard and never repeating, so important?

**DR. PARK:** It removes rival explanations. Equal difficulty rules out harder tasks; no repeats rules out forgetting. A healthy learner should score about the same on task 500 as on task 5, so upward drift in L-hat-k points to declining learning ability. One caveat: early on, positive transfer, earlier tasks helping later ones, can mask the decline. Book Chapter 10.

**CAPT. AL-HARBI:** The book's version: rotate an inspector through a new, equally demanding airport every month, never going back. The monthly error rate should stay flat. If it creeps up, it isn't a harder posting and it isn't forgetting. Early on, experience from earlier postings can hide the fade. Where it breaks: an inspector's fade is fatigue you can ask about; a network's shows only in the curve.

#### Listener question

*[MUSIC: explainer bed]*

**DEV:** We have a listener question. Someone writes: "If plasticity loss is about not learning, why don't they just measure the final accuracy on each task?"

**LUCÍA:** Because final performance hides speed. Two learners can finish in the same place. Averaging over the whole task, Equations 2.4 and 2.5, scores the faster learner better, and that is the score that rises when a learner's ability to learn fades.

### Three Things to Remember

*[MUSIC: "Still Learning" theme, low]*

**MIRIAM:** One. Today's networks train on a fixed dataset, freeze, and deploy; learning stops before deployment, even with fine-tuning or human feedback. The workarounds, periodic retraining with its knowledge cutoffs and loading facts into context windows, are stopgaps.

**MIRIAM:** Two. Forgetting has been studied heavily; losing the ability to learn, far less. Plasticity loss appears in all four architectures tested: pervasive, but not inherent. The cure avoids one-time operations: selective reinitialization, with a utility measure, pruning criterion and reinitialization method, applied to units or weights.

**MIRIAM:** Three. One stream, tasks switching with the distribution, nothing reset at the boundary. Cross-entropy charges minus the log of the probability on the right answer. The learner minimizes J-hat as a stand-in for J. Each task is scored by its average loss over every step, which rewards fast learning and exposes a learner that is slowing.

### Check Your Understanding

*[SFX: soft chime]*

**LUCÍA:** Five questions. Pause after each.

**LUCÍA:** One. Why don't fine-tuning and human feedback make today's systems continual learners?

*[BEAT]*

**DEV:** Because they still happen before deployment. Once deployed, the network is frozen.

**LUCÍA:** Two. Which side of the stability–plasticity dilemma does the thesis study, and why was it overlooked?

*[BEAT]*

**DEV:** Plasticity. Research concentrated on forgetting, which could lead people to assume plasticity is guaranteed.

**LUCÍA:** Three. If W is in R ten-by-twenty, what are the dimensions of W bracket 2 colon 5, 0 colon 8? And in N of zero, two, is the two a variance or a standard deviation?

*[BEAT]*

**DEV:** Five minus two by eight minus zero: three by eight. And under the section 2.1 convention, a standard deviation of 2.

**LUCÍA:** Four. The correct class gets probability 0.5. Cross-entropy loss, natural log?

*[BEAT]*

**DEV:** Minus log of 0.5. About 0.69.

**LUCÍA:** Five. Two learners end task k with the same loss. Why might their L-hat-k differ? And why does a forgetting-prevention method gain nothing here?

*[BEAT]*

**DEV:** L-hat averages over every step, so the faster learner scores lower. And tasks don't repeat, so remembering old ones earns nothing.

### Credits and Next Time

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano]*

**NORA:** I like this. Tasks, one after another. I could do this forever.

**MIRIAM:** She believes that. The thesis suggests otherwise. Next time, we go inside Nora: how a network actually learns, step by step, from noisy samples, and the network designs the rest of the series depends on. Episode Two: Downhill in the Fog.

**MIRIAM:** STILL LEARNING is narrated by me, Miriam Okafor, with Dev Raman and Lucía Ferreira. The Thesis was read by Graham Asante. Nora was Nell Varga. The Archivist was Ruth Kellerman. The Auditor was Samir Haddad. The Units were our ensemble. Our source is the book *Keeping Neural Networks Learning*. The thesis is © Juan Fernando Hernandez Garcia, 2026, licensed CC BY 4.0, adapted here with credit. The code is at github.com/JFernando4/plasticity-via-reinit. All experts and actors in this series are fictional.

*[MUSIC: theme resolves]*

### Show Notes

**Thesis sections covered:** Abstract (pp. ii–iii); Preface (p. iv); Chapter 1 Introduction (pp. 1–3, PDF pp. 26–28); Chapter 2 opening and §2.1 Notation (pp. 4–5); §2.2 Continual Supervised Learning of Tasks (pp. 5–7). Book: About this book; Chapters 1–3.

**Papers in the Preface:** Dohare, Hernandez-Garcia, Lan et al., "Loss of plasticity in deep continual learning," *Nature* 632, 768–774 (2024), doi 10.1038/s41586-024-07711-7 (thesis Chs. 3, 6, 7). Hernandez-Garcia, Dohare, Luo and Sutton (2025), "Reinitializing weights vs units for maintaining plasticity in neural networks," CoLLAs, oral (thesis Chs. 4, 5, 7).

**Figures and diagrams (all explanatory diagrams, new for the book; this range has no thesis figures, tables or algorithms):**

- The book's path, five Parts: five stacked boxes; Parts I–II problem, III cure, IV scale-up, V close.
- Train → freeze → deploy vs the continual-learning loop: top row today's pipeline with a dashed retraining loop; bottom row a loop where learning never stops.
- The stability–plasticity balance: forgetting on the left, inability to learn on the right; the thesis studies the right.
- Matrix indexing: a 4 × 6 grid with one element, a 2 × 3 slice, and a dashed whole row.
- A data stream cut into tasks: one learner's parameters run unbroken through every task boundary.

**Decoder table:**

| Symbol | Read it as |
| --- | --- |
| ℕ / ℕ₀ | natural numbers from 1 / including 0 |
| ℝ | real numbers |
| [n] | {1, 2, …, n} |
| **x** / **W** | vector / matrix or tensor |
| **W**[i, j] | element, row i, column j (book's row-first reading) |
| **W**[a:b, q:r] | (b − a) × (r − q) submatrix; m ≥ b > a, d ≥ r > q |
| : alone | whole dimension |
| X, Y / **X**, **Y** | scalar / n-dimensional random variable |
| p | probability distribution, possibly joint; X ~ p |
| 𝒩(μ, σ) | normal, mean μ, standard deviation σ (§3.4 uses a variance) |
| 𝒰(a, b) | uniform between a and b |
| 𝔼ₚ[X], 𝕍ₚ[X] | expected value, variance under p |
| {Xᵢ}ᵢ₌₁ⁿ | a sequence; Xᵢ the i-th element |
| t | time step |
| f, g / f_θ | functions / function with parameters θ |

**Toy tables (made-up numbers, not thesis results):**

| Prediction Ŷ (correct class 2) | P(correct) | Loss |
| --- | --- | --- |
| (0.2, 0.7, 0.1) | 0.7 | 0.36 |
| (0.6, 0.3, 0.1) | 0.3 | 1.20 |
| (0.98, 0.01, 0.01) | 0.01 | 4.61 |

| Learner | Mini-batch losses | L̂ |
| --- | --- | --- |
| A | 2.0, 1.2, 0.6, 0.2 | 1.0 |
| B | 2.0, 1.8, 1.6, 1.4 | 1.7 |

**Auditor notes:** Abstract's "successfully maintained" is qualified for vision transformers (reduced, not prevented); W[i,j] read row-first despite the thesis sentence; 𝒩's second argument is a variance in §3.4; "c, d ∈ ℕ" should be n; f_θₜ(Xₜ) output is Ŷₜ, not Yₜ; τₖ counts pairs but acts as steps in Eqs. 2.4–2.5.

**Equations:**

Equation 2.1 — cross-entropy loss

```latex
\ell(\hat{\mathbf{Y}}, \mathbf{Y}) \doteq -\sum_{i=1}^{c} \mathbf{Y}[i] \cdot \log\left(\hat{\mathbf{Y}}[i]\right)
```

Equation 2.2 — objective

```latex
J(\boldsymbol{\theta}_t) \doteq \mathbb{E}_{p_k}\left[\ell\left(f_{\boldsymbol{\theta}_t}(\mathbf{X}_t), \mathbf{Y}_t\right)\right]
```

Equation 2.3 — empirical loss

```latex
\hat{J}(\boldsymbol{\theta}_t) \doteq \frac{1}{m}\sum_{i=1}^{m} \ell\left(f_{\boldsymbol{\theta}_t}(\mathbf{x}_{t,i}), \mathbf{y}_{t,i}\right)
```

Task start bookkeeping (unnumbered)

```latex
T_j = \sum_{i=1}^{j-1} \tau_i, \qquad T_1 \doteq 0
```

Equation 2.4 — average expected loss for task k

```latex
\mathcal{L}_k(\boldsymbol{\theta}_{T_k}) \doteq \frac{1}{\tau_k}\sum_{j=0}^{\tau_k - 1} \mathbb{E}_{p_k}\left[\ell\left(f_{\boldsymbol{\theta}_{T_k+j}}(\mathbf{X}_{T_k+j}), \mathbf{Y}_{T_k+j}\right)\right]
```

Equation 2.5 — average empirical loss for task k

```latex
\hat{\mathcal{L}}_k(\boldsymbol{\theta}_{T_k}) \doteq \frac{1}{\tau_k}\sum_{j=0}^{\tau_k - 1} \frac{1}{m}\sum_{i=1}^{m} \ell\left(f_{\boldsymbol{\theta}_{T_k+j}}(\mathbf{x}_{T_k+j,i}), \mathbf{y}_{T_k+j,i}\right)
```
