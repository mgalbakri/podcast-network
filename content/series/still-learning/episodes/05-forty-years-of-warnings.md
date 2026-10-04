---
number: 5
title: Forty Years of Warnings
slug: 05-forty-years-of-warnings
summary: Plasticity loss was spotted again and again from 1986 onward under at least eight different names. How did nobody connect the dots? Plus the five ways to measure it, a small network that beats a big one, and the oldest cure in the book.
coverage: Covers book chapters 10–11 (thesis §3.5–3.6, the opening of thesis Chapter 4, and §4.1). The forty-year trail of sightings, the many names for one problem, the five ways to put a number on plasticity loss, the small network that beats a big one, and the oldest cure in the book.
interests:
- ai
- history
estimatedMinutes: 52
status: in-production
---

### Cold Open

*[AMBIENCE: archive room, page turns. A filing drawer slides open.]*

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano, held under — 00:00]*

**MIRIAM:** In 1986, a researcher named Munro published a study of a single artificial neuron. One hidden unit. He described a window, early on, when the neuron was most plastic, and a loss of its ability to learn after that window closed. He called it a critical learning period. And he used a word that would become fashionable decades later. Plasticity.

*[BEAT]*

**MIRIAM:** Then the file went into the drawer.

*[SFX: drawer closes]*

**MIRIAM:** Fourteen years later, psychologists modelling how people learn words saw the same thing in their networks. They used it as a modelling tool, not a defect. Another drawer.

*[SFX: second drawer closes]*

**MIRIAM:** In 2018, machine learning researchers saw it again. They called it intransigence. The same year, another team called it loss of information plasticity. In 2021, reinforcement learning researchers called it implicit under-parameterization. In 2022, primacy bias. Also in 2022, capacity loss. In 2023, dormant neurons.

*[SFX: drawers closing, one after another, faster, until they overlap]*

*[BEAT]*

**MIRIAM:** Drawer after drawer. Forty years. And until 2022, nobody pulled them all out onto the same table and said: this is one thing.

*[MUSIC: theme swells]*

**MIRIAM:** I'm Miriam Okafor. This is STILL LEARNING. Episode Five: Forty Years of Warnings. How a problem hid in plain sight for four decades, how you measure it, and how a small network beat a big one.

*[MUSIC: title sting, cello resolves — 02:10]*

### Act One — The Trail of Sightings

*[MUSIC: explainer bed — plucked bass, light percussion]*

**DEV:** Forty years, and nobody connected the dots? That's a cold case.

**LUCÍA:** It is. The chapter's opening claim, exactly: Loss of plasticity was observed again and again from 1986 onward, under at least eight different names, before the thesis author and his co-authors identified it as one phenomenon. Why it matters, the book says: the history shows the problem is old and real. Not an artefact of one lab's experiments.

**MIRIAM:** To walk the trail, we went to the record, and to a historian.

*[TAPE: Dr. Elena Marchetti, historian of artificial intelligence, recorded in a university library reading room. Quiet; a radiator ticks.]*

**DR. MARCHETTI:** Think of a timeline with four bands. A single-unit study in 1986. A cluster of psychology models in the 2000s. Scattered machine learning sightings starting in 2018. And then, from 2022, a unification under one name.

*[AMBIENCE: archive room, page turns]*

**THE ARCHIVIST:** Munro, 1986. The earliest study the thesis author found. Subject: a single hidden unit. Finding: the unit lost its ability to learn after what the paper called a critical learning period, a window during which the neuron was most plastic. Note for the file: this paper already used the word "plasticity."

**DR. MARCHETTI:** And what Munro was describing, in modern terms, is what the series covered last episode. Unit saturation.

**LUCÍA:** A Sigmoid or Tanh unit pushed out onto the flat part of its S-curve, where the slope, and so the gradient, is near zero.

**MIRIAM:** The second band. The 2000s.

**THE ARCHIVIST:** Psychology models, 2000 to 2009. Ellis and Lambon Ralph, 2000: neural networks used to model the age-of-acquisition effect. Follow-up papers: Smith et al., 2000; Zevin and Seidenberg, 2002; Ralph and Ehsan, 2006; Mermillod et al., 2009. Finding: systems built on shallow, fully-connected networks lost their ability to learn from new data after initial training. Separately, Thomas and Johnson, 2006: neural networks used to model sensitive learning periods in humans. Note for the file: Smith et al., 2000, is the first paper in this wave published at a machine learning conference.

**MIRIAM:** Why would psychologists want a network that loses its ability to learn?

*[TAPE: Dr. Hana Lindqvist, computational neuroscientist, recorded by video link from her lab. A centrifuge hums in the background.]*

**DR. LINDQVIST:** It's a lovely inversion. To an engineer this is a bug. To a psychologist in 2000 it was a modelling tool. The age-of-acquisition effect is simply this: people recall words they learned early in life more readily than words they learned later. So the modelling question was: what kind of learning system would naturally produce that? One answer was a network that learns early material while it is still changeable, then becomes less able to learn from new data. Exactly what these shallow, fully-connected models did.

**MIRIAM:** And Thomas and Johnson, the sensitive periods?

**DR. LINDQVIST:** They modelled sensitive learning periods in humans. Their probe was lesions: deliberate damage to the network, then the question of whether it can relearn what was lost. They found that recovery from lesions decreased the longer the network had been trained.

**MIRIAM:** So early damage is more recoverable than late damage.

**DR. LINDQVIST:** Yes. And the interpretation the thesis draws from that is that sensitive periods correspond to early training, when networks still have the plasticity to relearn damaged representations.

**DEV:** Dumb question. If psychologists were publishing this in 2000, one paper even at a machine learning conference, why didn't machine learning go "uh oh"?

**DR. LINDQVIST:** Not dumb. They were looking at a different fire.

*[TAPE: back to Dr. Marchetti, library]*

**DR. MARCHETTI:** The book is blunt. The phenomenon did not capture the machine learning community's attention. That community devoted far more effort to catastrophic forgetting. The Archivist has the citations.

**THE ARCHIVIST:** McCloskey and Cohen, 1989. French, 1999. Subject: catastrophic forgetting, the loss of old knowledge when learning new tasks.

**DR. MARCHETTI:** Two mirror-image failures. Forgetting: I learned the new and lost the old. Plasticity loss: I can't learn the new. The spotlight went to the first.

**MIRIAM:** Captain, does this look familiar?

*[TAPE: Capt. Rashid Al-Harbi, retired airline training captain and maintenance director, recorded in a flight-simulator briefing room. A projector fan whirs.]*

**CAPT. AL-HARBI:** Painfully. The book's analogy, and I'll label it as one. Picture a recurring maintenance finding logged by different stations under different defect codes. Each station records it. But because nobody aggregates the codes, the fleet-wide pattern stays invisible for years. Where it breaks: a fleet's stations share one defect-code system that could be cross-referenced. These fields didn't share a vocabulary at all. It wasn't just that nobody aggregated; there was no common ledger to aggregate.

*[MUSIC: explainer bed returns]*

**MIRIAM:** The third band. Two decades later.

**THE ARCHIVIST:** Machine learning sightings, 2018 to 2021. Evidence, the book says, without systematic study. Item: Chaudhry et al., 2018. Neural networks suffer both from catastrophic forgetting and from loss of plasticity, which they called intransigence. Setting: class-incremental learning, with fully-connected and convolutional networks.

**LUCÍA:** Class-incremental means new classes are added over time.

**THE ARCHIVIST:** Item: Achille et al., 2018. Found critical learning periods in fully-connected and convolutional networks, during which learning was more sensitive to distortions in the data stream. The Fisher information of the weights decreased after those periods. Name given: loss of information plasticity.

**LUCÍA:** Fisher information is, roughly, how sensitive the network's outputs are to each weight. The book calls it a proxy for how much information the weights hold.

**THE ARCHIVIST:** Item: Ash and Adams, 2020. Fully-connected and convolutional networks lost their ability to learn from new observations if they were first pre-trained on a smaller subset of the dataset. Cross-reference: the same authors coined "shrink-and-perturb," covered in Episode Four.

**DR. MARCHETTI:** The tool and the symptom came out of the same shop, and still weren't filed under one heading.

**THE ARCHIVIST:** Item: Dohare, 2020, and Rahman, 2021. Both noted that features in fully-connected networks lost adaptiveness when trained on sequences of non-stationary learning problems.

**MIRIAM:** And within that third band, a flood from one corner of the field.

**THE ARCHIVIST:** Deep reinforcement learning sightings, 2021 to 2023.

**LUCÍA:** Quick definition. Reinforcement learning is learning by trial and error from rewards. And the book makes the point that its agents face constantly shifting data by nature.

**THE ARCHIVIST:** Item: Igl et al., 2021. The non-stationary observation distribution experienced by deep RL agents hurt performance. Item: Kumar et al., 2021. The stable rank of the representation layer of deep RL agents decreased over time. Name given: implicit under-parameterization. It came with a growing inability to fit sequences of value functions.

**LUCÍA:** Value functions are the agent's estimates of future reward. And stable rank, from last episode, is roughly how many directions the representation really uses.

**DR. MARCHETTI:** And that's where Episode Four's stable-rank measure comes from.

**THE ARCHIVIST:** Item: Nikishin et al., 2022. Deep RL agents tend to overfit to their initial experiences, losing the ability to learn from new observations. Name given: primacy bias. Item: Lyle et al., 2022. Deep RL agents lost the ability to update their predictions quickly. Name given: capacity loss. Item: Sokar et al., 2023. Reduced ability to learn from new observations, attributed to an accumulation of dormant neurons. Note for the file: this thesis calls dormant neurons frozen units.

*[SFX: Unit chorus, a few voices dropping out]*

**UNIT 88:** Dormant. Frozen. Whatever you call it, it's quiet in here.

**LUCÍA:** That's the table. It's in the show notes: year, work, name, setting, from Munro to dormant neurons.

*[MUSIC: cello pulse returns, low — 10:40]*

**THE ARCHIVIST:** Unification, 2022 onward. Papers on the loss of the ability to learn were multiplying fast. The book records that none recognized the effect as the same underlying phenomenon. That changed when the thesis author's co-authors presented early results at the Conference on Lifelong Learning Agents, known as CoLLAs. Citation: Sutton and Dohare, 2022. The accompanying manuscript used the term "loss of plasticity" and identified the earlier work as one phenomenon. Citation: Dohare et al., 2023. That effort led to a publication in the journal *Nature*. Citation: Dohare et al., 2024.

**DR. MARCHETTI:** Then the dam breaks. A run of papers studying it directly.

**THE ARCHIVIST:** Lee et al., 2024. Elsayed et al., 2024. Lyle et al., 2024b. Dohare et al., 2024. Elsayed and Mahmood, 2024. Chung et al., 2024. Farias and Jozefiak, 2025. Lewandowski et al., 2025.

**MIRIAM:** Why the flood, once there was a name?

**DR. MARCHETTI:** A name is an index. Before 2022, a researcher whose network stopped learning had no search term leading to the psychologists, the reinforcement learning people, or Munro. The phenomenon didn't change. The index did. And many methods have since been proposed to address it.

**LUCÍA:** Which the thesis defers to its following chapters. For us, Episode Six onward.

### Act Two — Putting a Number on It

*[MUSIC: explainer bed — plucked bass, light percussion — 12:15]*

**MIRIAM:** The problem has a name. Now: what counts as evidence?

**LUCÍA:** The thesis defines loss of plasticity as the loss of the ability to learn. To study it scientifically, you need a number, a numerical definition. The thesis names two traits a good one should have. One: it captures the essence of the phenomenon under study. Two: it is measurable, so researchers can replicate it many times. The thesis reviews five numerical definitions from the literature against those two traits. Everything is written in terms of loss, to match the language of the series' early episodes. Loss moves opposite to accuracy. Lower loss is better. And as long as a measure is a good indicator of learning, the book says loss and accuracy can be used interchangeably here.

*[SFX: soft chime]*

**LUCÍA:** Welcome to the Toy Box. Tonight's props: five index cards and a bag of mints. Card one. Definition one. Average expected loss. Thesis Equation 3.2. Let me say it in words. "Script L sub k, of theta sub T k, is defined as: one over tau sub k, times the sum, for j from zero to tau sub k minus one, of the expected value, over p sub k, of little ell of f with parameters theta at time T k plus j, applied to X at T k plus j, compared with Y at T k plus j."

**DEV:** Symbol by symbol, please.

**LUCÍA:** k is the task number. Capital T sub k is the number of steps taken before the current task began, so step T k is the first step of task k. Theta sub T k is the network's parameters at the start of task k. Notice the whole loss is written as a function of where the task started. Tau sub k, the Greek letter tau, is the length of the task. j counts steps within the task, from zero up to tau minus one. Theta at T k plus j is the parameters at step j of the task, after the SGD updates. X and Y are an input and its target, drawn from task k's data-generating distribution, p sub k. f sub theta of X is the network's prediction. Little ell is the loss function. The big E with p k under it is the expected value: the average loss over all possible data task k could produce, not just the examples the network happened to see.

**DEV:** And the one over tau with the sum?

**LUCÍA:** Average those expected losses over every step of the task. So in plain words, the book's plain words: how wrong the network is, on average over everything task k could throw at it, at each moment while it learns task k, averaged over the task.

*[SFX: ledger bell]*

**THE AUDITOR:** A note for the record on the symbol tau. The thesis defines tau sub k as the number of observation-target pairs in task k. But in these sums, tau plays the role of the number of update steps. With mini-batches of m pairs, those two quantities differ by a factor of m. The book calls this a looseness in the thesis's notation. For listening purposes: read tau as the number of steps in the task.

**LUCÍA:** Now the assessment. If every task is equally difficult, a system losing plasticity shows an increasing trend in average expected loss. And if tasks never repeat, that increase can only come from losing the ability to learn. So this definition captures the essence. But it needs p sub k. The true data distribution. Which you almost never have. Because it's not easily measured, the thesis calls it unsuitable as a numerical definition.

**DEV:** The perfect thermometer you can't buy.

**LUCÍA:** Card two. Average empirical loss. Equation 3.3. Same shape, but we replace "everything the task could throw at you" with "what it actually threw at you." In words: "L-hat sub k of theta T k equals one over tau k, times the sum over j from zero to tau k minus one, of one over m times the sum over i from one to m of the loss of the network's prediction on little x at T k plus j, i, compared with little y at T k plus j, i."

**DEV:** Why the hat?

**LUCÍA:** The hat marks an estimate built from observed data. The little x's and y's, with two subscripts, t and i, are the mini-batch: m examples sampled from p k at time t. One over m times the sum over i is the average loss over that mini-batch. Then one over tau times the sum over j averages again over all the steps of the task. And here's the punchline the series has been sitting on. The accuracy version of Equation 3.3 is exactly the average online accuracy we've used since Episode Three.

**DEV:** Oh. Oh, so the yardstick we've been using all along is definition two.

**LUCÍA:** Definition two. Under it, a system is losing plasticity if the average empirical loss increases. Equivalently, if average online accuracy falls. Now, the mints.

*[SFX: mints rattle onto a table]*

**LUCÍA:** The book's toy example, in three piles. Three equally hard tasks. Average empirical loss: 0.30, then 0.34, then 0.39.

**DEV:** The piles are growing. Rising loss. Plasticity loss.

**LUCÍA:** That's the signal. Advantage of this definition: it's available for free as the network learns. And with enough samples, it should capture the essence. Its limit: it's valid only if all tasks are equally difficult.

**DEV:** Because if task three was just a harder task...

**LUCÍA:** Then the pile grows with no plasticity loss at all. If each task were harder than the last, the loss could rise even with no loss of plasticity.

*[SFX: mints swept back into the bag]*

**LUCÍA:** Card three. Average empirical loss with baseline. Equation 3.4. This one is short. "L-hat k of theta T k, minus L-hat k of theta zero." The first term is the average empirical loss on task k of the network that has been learning continually through all previous tasks. Theta zero is a freshly initialized set of parameters. So the second term is the average empirical loss on task k of a network trained from scratch on task k alone. The difference tells you how the veteran compares with a newcomer on the same task. The book's analogy, labelled: benchmarking a veteran employee against a new hire on the same new assignment. If the veteran consistently does worse, experience has become a handicap.

**CAPT. AL-HARBI:** Where it breaks: an airline's new hire arrives already trained. The fresh network is trained from scratch on that one task alone. It's a rawer baseline than any airline would accept.

**LUCÍA:** The thesis calls this the average empirical loss with baseline. And it says a system is losing plasticity if this measure is negative.

*[SFX: ledger bell]*

**THE AUDITOR:** A note on the sign of Equation 3.4. As printed, the equation subtracts the fresh network's loss from the continual network's loss. Read literally, a continual network that learns worse than a fresh one has the higher loss. Higher minus lower is positive. So under the equation as printed, plasticity loss would show up as a positive number. The thesis, however, states that a negative value signals plasticity loss. That statement matches the accuracy version of the comparison: continual accuracy minus fresh-network accuracy, which is negative when the continual network learns worse. The book's correction: whichever way the difference is taken, the meaning is the same. Plasticity is being lost when the continual network learns the task worse than a freshly initialized one.

**LUCÍA:** So: in loss, veteran minus rookie positive means trouble. In accuracy, negative means trouble.

**THE AUDITOR:** Correct. Ledger noted.

*[SFX: ledger closes]*

**LUCÍA:** Assessment of Equation 3.4. It assumes that a freshly initialized system has inherent plasticity, which the book calls not an unrealistic assumption. So it captures the essence, and it's measurable. Its main cost: it requires training an additional learning system for every task.

**DEV:** One extra rookie per task.

**LUCÍA:** Every task. And a footnote: Chaudhry et al., 2018, the "intransigence" paper, used this exact measure in their study of catastrophic forgetting and intransigence.

**THE ARCHIVIST:** Cross-reference noted.

*[MUSIC: explainer bed drops out. A single low piano note — 21:30]*

**MIRIAM:** And here, a complication. A witness who might be hiding the evidence.

**LUCÍA:** Positive transfer. Neither Equation 3.3 nor Equation 3.4 completely isolates loss of plasticity, because positive transfer can hide it. Positive transfer means information learned on one task helps on future tasks, improving performance. It's a good thing, which makes it a good disguise. Remember the audio figure from last episode, Figure 3.5a? Every system's accuracy rises at first, before steadily declining. It's tempting to look at that early rise and conclude no plasticity is being lost during it. But the system may be losing plasticity while benefiting from positive transfer, and the transfer may completely dominate, making the loss invisible.

**DEV:** So you need a test the network has never seen, where past experience can't help.

**LUCÍA:** Card four. The probing methodology. To isolate plasticity loss completely, you periodically test the network on a fresh, synthetic task built from the current task's inputs. Five steps. Dev reads, I explain.

**DEV:** Step one. At time T, pause and begin a probing phase, starting from the current network, f sub theta T. Step two. Take inputs X from the current task, but discard the original targets Y.

**LUCÍA:** Keep the questions, throw away the answer key.

**DEV:** Step three. Create new targets from a random function of X. For example, Y-prime equals a plus sine of ten times f sub beta of X. Where a is a real number, and f sub beta is a network with the same form as f theta T, but with randomly initialized parameters beta.

**LUCÍA:** A second network, same shape, random weights; multiply its output by ten, take the sine, add a. The point: these labels are new to the network, yet it should be able to represent them, because they were generated by a network of its own shape. Step four.

**DEV:** This defines a new data-generating process, X and Y-prime drawn from p-prime k. Train the network on it, starting from theta T, and measure Equation 3.3 or 3.4 on samples from p-prime k.

**LUCÍA:** Train on the synthetic task, measure with definition two or three. Step five.

**DEV:** After a set amount of training, reset the parameters to theta T and resume learning the original task.

**CAPT. AL-HARBI:** The book's analogy, and a good one. A periodic fitness-for-duty check. Every so often, a pilot flies an unfamiliar simulator scenario unrelated to current operations, then returns to normal duties as if nothing happened. If scores on these unfamiliar scenarios fall over the years, adaptability is declining, regardless of how well routine flights go.

**MIRIAM:** And where does it break?

**CAPT. AL-HARBI:** A pilot remembers the session; the network is rolled back. And whoever designs the scenario shapes what you measure.

*[SFX: ledger bell]*

**THE AUDITOR:** A note on wording. The thesis states that a network is losing plasticity "if we observe a decreasing trend in the average empirical loss in the synthetic task as the amount of training and probing phases increases." Read literally, a falling loss means the network is getting better at the probes. As with the sign note on Equation 3.4, the surrounding argument makes the intended signal clear: the network learns each new probe less well as training goes on. So probe accuracy trends down, and probe loss trends up. Ledger noted.

**LUCÍA:** Who proposed probing?

**THE ARCHIVIST:** Lyle et al., 2022, for the average empirical loss. Lyle et al., 2023, for the average empirical loss with baseline.

**LUCÍA:** Assessment. Besides isolating plasticity loss, probing needs no notion of tasks. So it suits problems with no clear task boundaries. Downsides: the design of the synthetic tasks may introduce experimenter bias, the Captain's simulator problem. And training on synthetic tasks adds computational cost.

**DEV:** One card left.

**LUCÍA:** Card five. Regret. Equation 3.5. Regret is how much worse the system does than the best possible network, at every moment. Define theta-star at time t as the parameter vector that minimises the expected loss under p k, where f with theta-star has the same functional form as the learning system's network. Then, in words: "one over tau k, times the sum for j from one to tau k, of the expected loss of the learning system at step j of task k, minus the expected loss of the best possible network, theta-star, at that same step." The first expectation is the expected loss of the learning system at step j. The second is the expected loss of the best possible network of the same shape at that step. The difference is the regret at that step. Average over the task. One detail: here j runs from one to tau k, not zero to tau k minus one.

**DEV:** So it's like the average expected loss with a baseline.

**LUCÍA:** The book says exactly that, where the baseline is the best possible theta at every step, rather than a fresh network. Assessment: it still does not remove the effect of positive transfer. It needs theta-star, which is rarely available. But it lets researchers reason precisely about plasticity loss in the abstract.

**MIRIAM:** For a ruling on all five, we called a statistician.

*[TAPE: Dr. Sun-Hee Park, statistics and experimental design, recorded in a seminar room after a lecture. Chairs scraping.]*

**DR. PARK:** There's no winner. Each definition captures plasticity loss under different circumstances. The book's conclusion is that choosing the "best" definition matters less than using the right one for the experimental design. The scorecard is short. Only the expected loss and regret fail "measurable." Only probing escapes positive transfer. Everything measurable that controls for difficulty costs extra training. The full table is in your show notes.

**MIRIAM:** And for Permuted MNIST, the experiment this whole series is built on?

**DR. PARK:** The thesis uses the average empirical loss. An increasing trend in Equation 3.3, or in accuracy terms, a falling average online accuracy. The justification is that every task in Permuted MNIST is equally difficult. Every task is the same digits, just with the pixels shuffled differently. So the one assumption definition two needs is satisfied by construction.

**MIRIAM:** And the positive transfer problem?

**DR. PARK:** It doesn't isolate plasticity loss from positive transfer, and the book says so. But over many tasks, plasticity loss eventually dominates positive transfer. And the book adds what I'd call a silver lining. Positive transfer shows you the performance gains that are available if plasticity loss can be overcome.

**DEV:** So the disguise is also a promise.

### Act Three — The Small Network That Wouldn't Quit

*[MUSIC: "Still Learning" theme, low and slow — 28:50]*

**MIRIAM:** Thesis Chapter 3 ends with a discussion. Four conclusions. The first is about reach.

**THE THESIS:** From the thesis, adapted. A wide range of deep learning systems suffer from plasticity loss, which establishes how far the phenomenon extends in fully-connected networks. The settings tested included methods common in state-of-the-art systems. Residual connections, layer norm, dropout and GELU activations are common components of the fully-connected layers in modern large language models. This suggests that the fully-connected layers in large language models may be susceptible to plasticity loss.

**MIRIAM:** May be. An inference from components, not a test on a language model.

**THE ARCHIVIST:** Vaswani et al., 2017. Devlin et al., 2019. Brown et al., 2020.

**THE THESIS:** From the thesis, adapted. Scaling up the network mitigated the problem but did not remove it. Adding parameters may be a poor strategy against plasticity loss: it is expensive and not entirely effective.

**MIRIAM:** The second conclusion is about the symptoms from Episode Four. The frozen units, the growing weights, the shrinking gradients, the falling stable rank.

**THE THESIS:** From the thesis, adapted. These phenomena co-occur with plasticity loss and correspond to pathological effects that may slow learning. But there is no good argument that any of them causes plasticity loss. The debate over causes is ongoing.

**MIRIAM:** We asked our optimization theorist about the state of that debate.

*[TAPE: Prof. Tomás Adeyemi, optimization theory, recorded in his office. Chalk on a board.]*

**PROF. ADEYEMI:** The book records three things. First: for most of these phenomena, researchers have found counterexamples where the phenomenon is negatively correlated with plasticity loss. The citations are Lyle et al., 2023, and Lewandowski et al., 2024. That's fatal for a simple causal story. Second: the leading hypothesis today is that loss of curvature in the loss landscape is most strongly associated with the slowdown in learning. That's Lyle et al., 2023. Third: even so, there is still no strong theoretical evidence for a causal relationship.

**DEV:** Curvature in human, please.

**PROF. ADEYEMI:** Picture the loss as a landscape and gradient descent as a hiker in fog, the image from Episode Two. Curvature describes how sharply the surface bends. If the ground bends sharply, the hiker can feel which way is down. If the surface flattens out, the hiker gets very little signal about which way to move. A network whose landscape has gone flat underfoot learns slowly.

**MIRIAM:** So if they're not causes, why keep the symptoms?

**PROF. ADEYEMI:** Because the book says they remain useful. They describe extreme pathological scenarios that may suggest different approaches to mitigation, or serve as diagnostic tools in live systems.

**CAPT. AL-HARBI:** Engine-health monitoring, the book's analogy. We track vibration, oil debris, exhaust gas temperature. None of them is the failure itself. But each one flags when to look closer and hints at what to fix. Where it breaks: in an engine we usually know the causal chain behind each reading. Here nobody has shown it yet.

**MIRIAM:** The third conclusion is the one this episode has been building toward.

**THE THESIS:** From the thesis, adapted. Of all the remedies tested, shrink-and-perturb was the most successful at preventing plasticity loss. That suggests simple, inexpensive approaches may have a significant impact on large-scale systems.

*[MUSIC: out]*

*[SFX: soft chime]*

**LUCÍA:** Audio figure. Figure 3.6. The thesis's caption, in effect: a small network that keeps its plasticity eventually beats a network ten times larger that does not. x-axis: permutation number, which is task number, from 1 to 1,000. y-axis: average online accuracy per task, running from about 91.5 percent at the bottom to 95 percent at the top. Every line is averaged over 30 runs, and the shaded band around each line is one standard error. Two lines. Green: a three-hidden-layer ReLU network with 1,000 units per layer. Plain. No remedy. Orange: a three-hidden-layer ReLU network with 100 units per layer, with shrink-and-perturb. Now the shapes. And these values are read off the chart; the book flags them as approximate.

*[SFX: rising tone that thins and flattens, very slowly, under]*

**LUCÍA:** Green starts far ahead. It peaks near 94.5 percent within the first tasks. Then it declines. Steadily. Not a cliff, a slope.

*[SFX: a second, lower tone enters, perfectly steady]*

**LUCÍA:** Orange starts lower, near 93.2 percent. And it stays flat at that level for all 1,000 tasks.

*[SFX: the falling tone passes beneath the steady one]*

**LUCÍA:** Green crosses below orange at roughly task 400 to 450. And by task 1,000, green ends near 92 percent. Well below the small network.

*[BEAT]*

**MIRIAM:** A network with one-tenth of the units per layer eventually surpasses the larger one. Because it keeps its ability to learn.

**NORA:** I've been the green line. Everything's easy at the start. Then each shuffle takes a little more out of you, until a network with a tenth of your units learns better than you can.

**DEV:** Analogy, labelled: green is a jumbo, orange is a regional jet on a good maintenance programme.

**CAPT. AL-HARBI:** And it breaks instructively. A jumbo doesn't lose seats from flying. Here the big network's ability to learn really does shrink with use. It's as if the jumbo lost seats every month, and the small jet with the programme kept all of its.

**MIRIAM:** So what does it mean beyond MNIST?

**THE THESIS:** From the thesis, adapted. Inexpensive and straightforward algorithms such as shrink-and-perturb may be essential for further developing large deep learning systems.

**THE ARCHIVIST:** Springer et al., 2025. Finding: extended pre-training of language models can hurt fine-tuning performance.

**LUCÍA:** Definitions. Pre-training is the long initial training of a large model on broad data. Fine-tuning adapts it afterwards to a specific job. The thesis offers one possible explanation: models lose plasticity during pre-training. If so, shrink-and-perturb could improve performance by preventing that loss.

**THE ARCHIVIST:** Verwimp et al., 2025. Finding: shrink-and-perturb doubled the convergence speed during fine-tuning of pre-trained models.

**LUCÍA:** Which, the book says, makes the plasticity explanation more likely. Not proven.

*[TAPE: Dr. Priya Venkataraman, large-scale ML engineering, recorded by phone between meetings.]*

**DR. VENKATARAMAN:** This is the figure I'd put in front of a budget committee. Our default instinct is: make it bigger. Figure 3.6 says bigger starts ahead and still declines. But note the book's wording. "One possible explanation." "May be essential." It's a pointer, not a verdict.

**MIRIAM:** And the fourth conclusion.

**THE THESIS:** From the thesis, adapted. A secondary goal of Chapter 3 was to support the claim that deep learning systems designed for the stationary framework, where a network is trained once on fixed data, lose plasticity when trained on non-stationary data. Many demonstrations support this claim. But there is a prominent counterexample: L2 regularization, common in stationary systems, mitigated plasticity loss on Permuted MNIST. So some stationary techniques may already produce systems resistant to plasticity loss.

**THE THESIS:** That holds for Permuted MNIST. Later chapters show that L2 regularization is not always enough to prevent plasticity loss. The argument for the rest of the thesis is that continual learning needs techniques designed specifically for it. One such technique is selective reinitialization.

**MIRIAM:** And with that, the thesis turns a page. From the problem, to the cure.

### Act Four — The Factory Setting

*[MUSIC: "Still Learning" theme shifts to a major key for the first time — 37:00]*

*[SFX: click and hum]*

**MIRIAM:** Part Three. The thesis's main contribution opens with a four-point agenda.

**THE THESIS:** From the thesis, adapted. Where we stand: Chapter 3 showed plasticity loss across many deep learning systems built from fully-connected layers. Plasticity loss is a significant obstacle to building systems that learn continually.

**LUCÍA:** Fully-connected layer: every unit receives input from every unit in the layer before it.

**THE THESIS:** What already works, and its limit: L2 regularization and shrink-and-perturb prevented the problem in those experiments. Their effectiveness in a broader range of architectures has not been established.

**THE THESIS:** The new approach: selective reinitialization applied at the level of the unit, a single neuron, one computational node with its own weights. The approach is conceptually simple. Measure how useful each unit is, and periodically reinitialize the ones that are no longer useful.

**THE THESIS:** The two algorithms tested: continual backpropagation, from Dohare et al., 2021, and ReDo, from Sokar et al., 2023, on the Permuted MNIST problem. Both are then generalized into a broader family the thesis calls selective unit reinitialization. Framing them as one family makes it possible to change one ingredient at a time and see what each change does.

**DEV:** Sokar 2023. The dormant-neurons paper from Act One.

**MIRIAM:** And the thesis states its headline results up front.

**THE THESIS:** From the thesis, adapted. One: selective unit reinitialization is a robust way to maintain plasticity. Two: there are settings where continual backprop and ReDo fail to maintain plasticity. Three: those failures can be fixed by simple changes to how the algorithms measure a unit's usefulness, their utility measures. This work was published jointly at the 2025 Conference on Lifelong Learning Agents, Hernandez-Garcia et al., 2025. The thesis adds further experiments that deepen the analysis.

**CAPT. AL-HARBI:** The book's analogy, from my world. A maintenance programme for an airline fleet. Instead of grounding the whole fleet for overhaul, you track each component's condition and replace only the parts that have stopped pulling their weight, on a rolling basis. The questions thesis Chapter 4 asks are the questions any maintenance director asks. How do I track condition? That's utility. How many parts do I pull per cycle? That's the pruning criterion. And what do I fit in their place? That's the reinitialization method. Where it breaks: a replaced aircraft part is new, tested, certified. A reinitialized unit is new, yes, but random. Nobody has certified it does anything useful yet. It has to learn its job from zero.

**MIRIAM:** So why would a random part help at all?

**PROF. ADEYEMI:** Start with what initialization does. Parameter initialization is the step before any learning: every weight is set to a starting value. Those values are drawn at random, but from carefully chosen probability distributions. The distributions are designed so that gradients can travel backward through the network without vanishing, which means shrinking toward zero layer after layer, or exploding, growing without bound. Well-behaved gradients make the first stretch of learning work. The citations are Glorot and Bengio, 2010, and He et al., 2015. And here's the thesis's key observation.

**THE THESIS:** From the thesis, adapted. The benefits of this random initialization are undone during the learning process. As training moves the weights, they drift away from the carefully designed starting distribution. On a non-stationary data stream, where the task keeps changing, the helpful effects of initialization are therefore present only early on.

*[SFX: rising tone that thins and flattens]*

**NORA:** Not breaking. Drifting. Every weight a little further from where it began.

**CAPT. AL-HARBI:** The book's analogy again. A newly commissioned aircraft leaves the factory with every system in specification. Years of operation move each part away from that specification. Initialization is the factory setting. Continual learning is the years in service. Where it breaks: an aircraft's drift is wear, and it's mostly bad. A network's drift is learning, and it's mostly good. The weights have to move, or nothing is learned.

**PROF. ADEYEMI:** And there's a second problem, separate from drift. Even with a good initialization, gradient descent can settle into a suboptimal local minimum. That's a point where every small step makes the loss worse, even though a much better point exists elsewhere. It happens because the optimization problem in neural networks is non-convex. The loss surface has many valleys, not a single bowl. The thesis cites Liu, 2022, for this. One way to explore several valleys and find a better one is to selectively reinitialize parts of the network.

**MIRIAM:** One last drawer. The oldest.

*[AMBIENCE: archive room, page turns. A heavier drawer, older runners.]*

**THE ARCHIVIST:** Selfridge, 1958. The Pandemonium architecture. The thesis traces the idea of selectively reinitializing parts of a network back more than 50 years, to this paper. Note for the file: as part of motivating Pandemonium, Selfridge described the same local-minimum problem seen in today's deep networks. Reference: Figure 6 of Selfridge, 1958.

**DR. MARCHETTI:** So the idea of resetting parts of a network to escape a bad solution is older than Munro's warning. The cure, in a sense, was on file twenty-eight years before the first sighting of the disease.

**THE ARCHIVIST:** The idea of reinitializing units in a nonlinear network of units has been revisited several times. Klopf and Gose, 1969. Holland and Reitman, 1977. Waugh and Adams, 1995. Kaelbling, 1993. Mahmood and Sutton, 2013. Dohare, 2020. Rahman, 2021. Cross-reference: the series returns to this lineage in detail in Episode Six.

**DEV:** Dohare 2020 and Rahman 2021 again. They're in the sightings list and the cure list.

**MIRIAM:** So why should resetting units keep a network able to learn? The thesis gives two reasons.

**THE THESIS:** From the thesis, adapted. First, it restores initial conditions. A freshly reinitialized unit gets weights from the same distribution that made learning easy at the start. Part of the network is returned to that favourable state. Second, it adds a search process. Each reset tries a new random point in parameter space, the space of all possible weight settings. This search runs alongside gradient descent and may help the network escape severely suboptimal local minima.

*[SFX: soft chime]*

**LUCÍA:** Audio figure. The book draws this as two lanes. Top lane: ordinary training. One random draw at the very start, a bright mark, and then a long stretch where its benefit fades. Bottom lane: selective reinitialization. The same start. Then, all along the lane, repeated small resets of weak units, little marks every so often. And under each of those marks, the two benefits: initial conditions restored, and a new search point. The book's, with invented numbers. A layer has 100 units. After many tasks, 20 of them are barely used. Standard training leaves those 20 idle forever. A selective reinitialization scheme might re-randomize 1 or 2 of them every so often.

*[SFX: click and hum]*

**UNIT 47:** Oh. Oh, I can hear again.

**LUCÍA:** Each fresh unit starts in the "easy to train" state. And it's also a new random guess that gradient descent can build on. Numbers invented for illustration. One connection, labelled by the book as interpretation, not a thesis claim. Episode Four's symptoms: More frozen units, larger weights, smaller gradients, lower stable rank of the representation. The book's interpretation is that each of those is a drift away from the initial state. Reinitialization attacks the drift directly, by putting selected units back where they started. And the book adds a caution right away: later, in Episode Seven's material, it shows these symptoms are signals, not causes.

*[MUSIC: "Still Learning" theme, full]*

**MIRIAM:** Forty years ago, a single neuron lost its ability to learn after its critical period closed. At least eight names later, the field agreed it was one problem. Five yardsticks later, we know how to measure it, and what each yardstick can't see. And a network one-tenth the size, that never stopped being maintained, outlasted the giant. The thesis now asks a different question. Not why do networks lose the ability to learn. But this: what if initialization never stopped?

### Three Things to Remember

*[MUSIC: explainer bed, soft]*

**DEV:** One. It's an old problem with a new name. Seen for about four decades under many names: critical periods, intransigence, information plasticity, implicit under-parameterization, primacy bias, capacity loss, dormant neurons. Unified as "loss of plasticity" by Sutton and Dohare, 2022, Dohare et al., 2023, and the *Nature* paper, Dohare et al., 2024.

**LUCÍA:** Two. Measuring it means picking the right yardstick. A good numerical definition captures the essence and is measurable. Five options: average expected loss, 3.2; average empirical loss, 3.3; with baseline, 3.4; probing; and regret, 3.5. Permuted MNIST uses average empirical loss, in accuracy form average online accuracy, because all tasks are equally hard. Positive transfer can mask early loss, but over many tasks plasticity loss dominates.

**MIRIAM:** Three. Keeping plasticity can beat buying scale. A 100-unit network with shrink-and-perturb holds near 93 percent and overtakes a plain 1,000-unit network that falls from about 94.5 to 92. Symptoms are diagnostics, not causes; L2 is not always enough. And the cure the thesis builds next rests on two reasons: resetting restores the favourable initial conditions that gradients need, and it adds a random search that may escape poor local minima. An idea that goes back to Pandemonium, 1958.

### Check Your Understanding

*[SFX: soft chime]*

**LUCÍA:** Nine questions. Answers after each pause. One. Why did the phenomenon go unrecognized as one problem for so long?

*[BEAT]*

**DEV:** It appeared in separate fields, psychology, supervised learning, reinforcement learning, under different names, and machine learning focused on catastrophic forgetting. Nobody connected the findings until Sutton and Dohare, 2022, and Dohare et al., 2023.

**LUCÍA:** Two. Why is the average expected loss, Equation 3.2, unsuitable in practice, even though it captures the essence?

*[BEAT]*

**DEV:** It needs the true data distribution, p sub k, which is rarely available.

**LUCÍA:** Three. When would the average empirical loss, Equation 3.3, give a misleading signal?

*[BEAT]*

**DEV:** When tasks differ in difficulty. If each task is harder than the last, loss rises even with no plasticity loss.

**LUCÍA:** Four. What does probing solve that 3.3 and 3.4 don't, and at what cost?

*[BEAT]*

**DEV:** It isolates plasticity loss from positive transfer and needs no task boundaries. Costs: possible experimenter bias in designing the synthetic tasks, and extra computation.

**LUCÍA:** Five. What does Figure 3.6 suggest about scale versus plasticity?

*[BEAT]*

**DEV:** The bigger network starts better but still declines. A ten-times-smaller network that keeps its plasticity eventually overtakes it. Preserving plasticity can be a cheaper and more durable route than adding parameters.

**LUCÍA:** Six. Why are carefully chosen initialization distributions used, and what happens to their benefit in continual learning?

*[BEAT]*

**DEV:** They let gradients flow without vanishing or exploding, which makes initial learning work. Learning gradually undoes this, so on a non-stationary stream the benefit is present only early.

**LUCÍA:** Seven. What's a suboptimal local minimum, and why can gradient descent get stuck in one?

*[BEAT]*

**DEV:** A point where every small change makes the loss worse even though better solutions exist. The loss surface is non-convex, so gradient descent can settle in the wrong valley.

**LUCÍA:** Eight. Name the two reasons the thesis gives for why reinitializing units should maintain plasticity.

*[BEAT]*

**DEV:** It restores the initial conditions that made learning easy, and it adds a search over parameter space that may escape severely suboptimal local minima.

**LUCÍA:** Nine. Which two existing algorithms does thesis Chapter 4 evaluate, and what family does it generalize them into?

*[BEAT]*

**DEV:** Continual backpropagation, Dohare et al., 2021, and ReDo, Sokar et al., 2023. Generalized into selective unit reinitialization.

**MIRIAM:** And a listener question before we go. This one came in from Faisal, a maintenance planner who's been following along. He writes: "If the 1,000-unit network loses plasticity, couldn't you just give it shrink-and-perturb too, and get the best of both?"

**LUCÍA:** Good question, Faisal. Figure 3.6 compares exactly two lines: a plain 1,000-unit network and a 100-unit network with shrink-and-perturb. It doesn't show a 1,000-unit network with shrink-and-perturb, so this material can't give you that number. The figure makes a narrower point: scaling mitigated the problem but didn't remove it, and a cheap remedy on a much smaller network won in the long run.

### Credits and Next Time

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano]*

**MIRIAM:** This episode covered book chapters 10 and 11, thesis sections 3.5 and 3.6, the opening of thesis Chapter 4, and section 4.1.

**MIRIAM:** Our correspondents were Miriam Okafor, Dev Raman and Lucía Ferreira. Graham Asante read THE THESIS. Nell Varga was Nora. The Units were our ensemble. Ruth Kellerman was the Archivist. Samir Haddad was the Auditor. Our experts were Dr. Elena Marchetti, Dr. Hana Lindqvist, Prof. Tomás Adeyemi, Dr. Sun-Hee Park, Dr. Priya Venkataraman and Captain Rashid Al-Harbi.

**MIRIAM:** The thesis is © Juan Fernando Hernandez Garcia, 2026, licensed CC BY 4.0, adapted here with credit. All experts and actors in this series are fictional. The thesis code is at github.com/JFernando4/plasticity-via-reinit.

*[SFX: click and hum, several times, rhythmic, like a maintenance line]*

**MIRIAM:** Next time on STILL LEARNING. Episode Six: Recycling Neurons. Continual backprop and ReDo go head to head. How do you decide which unit has stopped pulling its weight? How many do you replace, and with what? And where do the two algorithms fail, and what simple change fixes them?

**UNIT 47:** Pick me. No, wait. Don't pick me. Actually, I'm not sure.

**MIRIAM:** I'm Miriam Okafor. Thank you for listening.

*[MUSIC: theme resolves and out — 52:00]*

### Show Notes

**Episode 5 — Forty Years of Warnings.** Book chapters 10–11. Thesis §3.5 (history; numerical definitions), §3.6 (discussion and conclusion), Chapter 4 opening, §4.1 (importance of random initialization and benefits of reinitialization). Thesis pp. 28–36.

**Equations**

Thesis Equation 3.2 — average expected loss on task k:

```latex
\mathcal{L}_k(\boldsymbol{\theta}_{T_k}) \doteq \frac{1}{\tau_k} \sum_{j=0}^{\tau_k - 1} \mathbb{E}_{p_k}\left[ \ell\left( f_{\boldsymbol{\theta}_{T_k + j}}(\mathbf{X}_{T_k + j}), \mathbf{Y}_{T_k + j} \right) \right] \qquad (3.2)
```

Thesis Equation 3.3 — average empirical loss on task k (accuracy form: average online accuracy):

```latex
\hat{\mathcal{L}}_k(\boldsymbol{\theta}_{T_k}) \doteq \frac{1}{\tau_k} \sum_{j=0}^{\tau_k - 1} \frac{1}{m} \sum_{i=1}^{m} \ell\left( f_{\boldsymbol{\theta}_{T_k + j}}(\mathbf{x}_{T_k + j, i}), \mathbf{y}_{T_k + j, i} \right) \qquad (3.3)
```

Thesis Equation 3.4 — average empirical loss with baseline (see Auditor note on sign):

```latex
\hat{\mathcal{L}}_k(\boldsymbol{\theta}_{T_k}) - \hat{\mathcal{L}}_k(\boldsymbol{\theta}_0) \qquad (3.4)
```

Probing methodology — example synthetic target (unnumbered in the thesis), with a a real number and f_β a randomly initialized network of the same form as f_θT:

```latex
\mathbf{Y}' = a + \sin\left(10 \cdot f_{\boldsymbol{\beta}}(\mathbf{X})\right)
```

Thesis Equation 3.5 — regret, with θ*ₜ the minimizer of the expected loss among networks of the same functional form:

```latex
\frac{1}{\tau_k} \sum_{j=1}^{\tau_k} \mathbb{E}_{p_k}\left[ \ell\left( f_{\boldsymbol{\theta}_{T_k + j}}(\mathbf{X}_{T_k + j}), \mathbf{Y}_{T_k + j} \right) \right] - \mathbb{E}_{p_k}\left[ \ell\left( f_{\boldsymbol{\theta}^{*}_{T_k + j}}(\mathbf{X}_{T_k + j}), \mathbf{Y}_{T_k + j} \right) \right] \qquad (3.5)
```

Thesis Chapter 4 opening and §4.1 contain no numbered equations.

**Audio figures**

- Figure 3.6 (thesis) — Average online accuracy per task (about 91.5%–95%) over 1,000 permutations, 30 runs, one-standard-error shading: green plain 3×1,000-unit ReLU network peaks near 94.5%, declines to about 92%; orange 3×100-unit ReLU network with shrink-and-perturb holds flat near 93.2% and overtakes green at roughly task 400–450 (values read off the chart).
- Book timeline "40 years of sightings · 1986 to the unification" — a single-unit study (1986), psychology models (2000s), scattered ML sightings (from 2018), unification under one name (from 2022).
- Book diagram "initialization once vs selective reinitialization over time" — top lane: one random draw whose benefit fades; bottom lane: same start plus repeated small resets of weak units, each restoring initial conditions and adding a search point.

No algorithms appear in this range.

**Table: one phenomenon, many names (book Chapter 10, thesis §3.5)**

| Year | Work | Name given to the effect | Setting |
| --- | --- | --- | --- |
| 1986 | Munro | Loss of plasticity after a critical learning period | Single hidden unit |
| 2000–2009 | Ellis and Lambon Ralph; Smith et al.; Zevin and Seidenberg; Ralph and Ehsan; Thomas and Johnson; Mermillod et al. | — (used to model the age-of-acquisition effect and sensitive periods) | Psychology models, shallow fully-connected networks |
| 2018 | Chaudhry et al. | Intransigence | Class-incremental learning |
| 2018 | Achille et al. | Loss of information plasticity | Critical learning periods |
| 2020 | Ash and Adams | Lost ability to learn after pre-training on a subset | Fully-connected and convolutional networks |
| 2020, 2021 | Dohare; Rahman | Features lose adaptiveness | Non-stationary problems |
| 2021 | Igl et al. | Performance harmed by non-stationarity | Deep RL |
| 2021 | Kumar et al. | Implicit under-parameterization | Deep RL |
| 2022 | Nikishin et al. | Primacy bias | Deep RL |
| 2022 | Lyle et al. | Capacity loss | Deep RL |
| 2023 | Sokar et al. | Dormant neurons | Deep RL |

Unification: Sutton and Dohare (2022, CoLLAs); Dohare et al. (2023); Dohare et al. (2024, *Nature*). Follow-on: Lee et al., 2024; Elsayed et al., 2024; Lyle et al., 2024b; Dohare et al., 2024; Elsayed and Mahmood, 2024; Chung et al., 2024; Farias and Jozefiak, 2025; Lewandowski et al., 2025.

**Table: which definition to use (book Chapter 10, thesis §3.5)**

| Definition | Equation | Captures the essence? | Easily measured? | Main limitation |
| --- | --- | --- | --- | --- |
| Average expected loss | 3.2 | Yes, if tasks are equally hard and never repeat | No: needs the true distribution pₖ | Not measurable in practice |
| Average empirical loss | 3.3 | Yes, with enough samples, if tasks are equally hard | Yes: available as the network learns | Fails if task difficulty varies; positive transfer can mask loss |
| Average empirical loss with baseline | 3.4 | Yes: controls for task difficulty | Yes, at extra cost | Must train a fresh network per task; positive transfer can mask loss |
| Probing methodology | 3.3 or 3.4 on synthetic tasks | Yes: isolates plasticity loss | Yes, at extra cost | Experimenter bias in task design; added computation |
| Regret | 3.5 | Yes, in the abstract | No: needs θ* | Positive transfer can mask loss; θ* rarely available |

**Auditor's ledger**

- τₖ notation: defined as the number of observation-target pairs in task k, but used in the sums as the number of update steps; with mini-batches of m these differ by a factor of m.
- Equation 3.4 sign: as printed (continual minus fresh loss), plasticity loss gives a positive value; the thesis says negative, which matches the accuracy version. Meaning: plasticity is lost when the continual network learns worse than a fresh one.
- Probing wording: the thesis says a "decreasing trend in the average empirical loss" on the synthetic task signals plasticity loss; the intended signal is probe loss trending up (probe accuracy trending down).

**Other citations named in this episode:** McCloskey and Cohen, 1989; French, 1999 (catastrophic forgetting). Vaswani et al., 2017; Devlin et al., 2019; Brown et al., 2020 (LLM components). Lyle et al., 2023; Lewandowski et al., 2024 (counterexamples; curvature hypothesis). Springer et al., 2025; Verwimp et al., 2025 (pre-training and fine-tuning). Dohare et al., 2021 (continual backpropagation); Sokar et al., 2023 (ReDo); Hernandez-Garcia et al., 2025 (CoLLAs). Glorot and Bengio, 2010; He et al., 2015 (initialization). Liu, 2022 (non-convexity). Selfridge, 1958 (Pandemonium, Figure 6). Klopf and Gose, 1969; Holland and Reitman, 1977; Kaelbling, 1993; Waugh and Adams, 1995; Mahmood and Sutton, 2013; Dohare, 2020; Rahman, 2021 (reinitialization lineage).
