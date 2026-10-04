---
number: 3
title: The Shuffle
slug: 03-the-shuffle
summary: 'The crime is witnessed. An ordinary network is handed an endless deck of equally hard puzzles. It gets better, levels off, and then slowly gets worse at learning. Bigger networks, new optimizers, other activations: nothing stops the slide.'
coverage: 'Covers book chapters 6–7 (thesis Chapter 3 opening, §3.1 and §3.2; Figures 3.1 and 3.2; hyperparameters in Table A.1). In this episode the crime is witnessed for the first time: an ordinary network, handed an endless deck of equally hard puzzles, gets better, levels off, and then slowly gets worse at learning.'
interests:
- ai
- science
estimatedMinutes: 50
status: in-production
---

### Cold Open

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano — 00:00]*

*[AMBIENCE: a quiet room, a single desk lamp hum]*

**MIRIAM:** In the first two episodes of this investigation, we built the suspect's world. We described a learner called a neural network, and we described the machinery it uses to learn: the loss, the gradient, the small downhill steps in the fog. Tonight we stop describing and start watching.

*[SFX: shuffling cards]*

**NORA:** Task one. Oh, I like this. Little pictures of handwritten digits, but the pixels are all scrambled. Doesn't matter. Same scramble on every picture. I can work with that.

*[SFX: shuffling cards]*

**NORA:** Task two. New scramble. Easier this time, actually. I think I'm getting the hang of scrambles.

*[SFX: shuffling cards, faster, overlapping]*

**NORA:** Task five. Task ten. Fine. Steady. I'm fine.

*[SFX: rising tone that thins and flattens]*

**NORA:** Task sixty. Task eighty. It's the same kind of puzzle. I know it's the same kind of puzzle. Why does it take me longer to get it?

*[BEAT]*

**MIRIAM:** Nobody made the puzzles harder. The network is the same network, with the same settings. And yet, task after task, it gets measurably worse at learning. Tonight we visit the test bench where the thesis recorded that decline, learn how it was measured, and then try to explain it away. We change the step-size, the size of the network, the optimizer, the activation function. Four suspects, each given a fair hearing.

*[BEAT]*

**MIRIAM:** None of them hold.

*[MUSIC: theme swells, then cuts]*

**MIRIAM:** From the production team of Still Learning, I'm Miriam Okafor. This is Episode Three: The Shuffle.

*[MUSIC: title sting]*

### Act One — The Test Bench

*[MUSIC: explainer bed — plucked bass, light percussion — 02:10]*

**DEV:** I'm Dev Raman.

**LUCÍA:** And I'm Lucía Ferreira. I've brought a deck of cards and a sheet of graph paper.

**DEV:** Episodes one and two were Part I of the book: what plasticity loss is, and the machinery. Today, Part II.

**LUCÍA:** Where the book puts numbers on it. Before anyone can claim a remedy works, there must be a fair, repeatable test in which a healthy learner holds steady and a failing learner visibly declines. That test is Permuted MNIST, and every result in book Chapters 6 through 10 is read off it.

**DEV:** Before we go in, give me the mission statement. What is thesis Chapter 3 trying to do?

**THE THESIS:** From the thesis, adapted. Chapter 3 is the first systematic demonstration of loss of plasticity in this dissertation. It focuses on fully-connected networks. It tests a broad range of algorithmic choices typical in deep learning, along with several earlier techniques for stabilizing learning. To keep so large a study affordable, every experiment uses a single continual classification problem built from the MNIST dataset.

**LUCÍA:** Refresher: in a fully-connected network, every unit in one layer connects to every unit in the next.

**DEV:** The open-plan office of neural networks.

**LUCÍA:** I'll allow it.

**MIRIAM:** And the chapter reaches a verdict in two parts.

**THE THESIS:** From the thesis, adapted. First: diverse deep learning configurations are susceptible to plasticity loss. Changing the step-size, the network size, the optimizer or the activation function does not make it go away. Second: the phenomenon is not inevitable. Shrink-and-perturb and L2 regularization successfully prevent it in fully-connected networks. Whether they work in other architectures is left open and tested later.

**MIRIAM:** The first half is tonight. The remedies are Episode Four.

*[AMBIENCE: archive room, page turns]*

**THE ARCHIVIST:** For the record. Shrink-and-perturb was introduced by Ash and Adams, 2020. The experiments in thesis Chapter 3 extend work from two collaborative publications: a paper in the journal *Nature* by Dohare and colleagues, 2024, and a paper at the Conference on Lifelong Learning Agents by Hernandez-Garcia and colleagues, 2025. The thesis adds a deeper characterization of plasticity loss in fully-connected architectures.

**LUCÍA:** Map check, full table in the show notes. Tonight: the thesis opening and section 3.1, book Chapter 6, how do we see and measure plasticity loss; and section 3.2, book Chapter 7, is it a quirk of one setup or widespread. Sections 3.3 to 3.6 become book Chapters 8 to 10.

*[SFX: soft chime]*

**LUCÍA:** The Toy Box. Let's meet MNIST.

*[SFX: paper sliding across a table]*

**LUCÍA:** MNIST is a collection of small grayscale pictures of handwritten digits, zero through nine. Each picture comes paired with its correct digit, and that correct digit is called the label. The dataset is cited as LeCun and colleagues, 2010.

**DEV:** And on your graph paper you've drawn a grid.

**LUCÍA:** Twenty-eight squares by twenty-eight squares. Each image is twenty-eight by twenty-eight pixels. Do the multiplication for me.

**DEV:** Seven hundred and eighty-four.

**LUCÍA:** Seven hundred and eighty-four pixels. Each pixel is an integer from zero to two hundred and fifty-five. In the thesis, every pixel is divided by two hundred and fifty-five, so every input lies between zero and one. That rescaling is called normalization. It keeps the input numbers small and comparable.

**DEV:** How many pictures?

**LUCÍA:** Sixty thousand training images, ten thousand test images, with nearly equal numbers of each digit.

**DEV:** Okay, here comes the dumb question. Isn't MNIST, like, famously easy? I've heard people say it's solved.

**LUCÍA:** Not dumb. By today's standards MNIST is small, and modern systems classify it with high accuracy. The book calls that a feature, not a flaw: small means thorough, systematic experiments with many repetitions, and with careful design it still reveals how deep learning systems work inside. That's why it remains one of the most widely used datasets in deep learning research.

**MIRIAM:** Our aviation voice has a view on that.

*[TAPE: Capt. Rashid Al-Harbi, recorded in a simulator briefing room]*

**CAPT. AL-HARBI:** The book's analogy, labelled: MNIST is the flight-simulator circuit of machine learning. Nobody tests a new pilot on it because it is hard. You use it because it is cheap to fly thousands of times under controlled conditions.

**MIRIAM:** Where does the analogy break?

**CAPT. AL-HARBI:** In the simulator, we test whether the pilot can fly the circuit. Here, everybody can fly the circuit; the question is what happens to the ability to learn after hundreds of slightly different circuits in a row. And a simulator circuit doesn't change under you. This one is about to.

### Act Two — The Shuffle

*[SFX: shuffling cards — 09:40]*

**LUCÍA:** Permuted MNIST is a continual supervised learning problem: a sequence of classification tasks, where each task is made by scrambling the pixels of every MNIST image in one fixed way.

**DEV:** Define scrambling.

**LUCÍA:** A permutation, a reshuffling of positions. To create a task, you draw one random permutation of the seven hundred and eighty-four pixel positions, and you apply that same permutation to every image in the dataset. The book's example: pixel one might move to position five hundred and twelve, pixel two to position thirty-seven, and so on. Identically for every image.

**MIRIAM:** The book has a diagram here, a small embedded figure whose caption reads "one shuffle per task, labels unchanged." Lucía, walk us through it.

**LUCÍA:** Audio figure. The book's diagram makes one point: one shuffle is drawn per task and applied to every image, and the labels are unchanged. A scrambled seven is still labelled seven, and every other seven is scrambled in exactly the same way. Two things follow. First, why the problem stays learnable. Every image in the task is scrambled the same way, so every image still belongs to exactly the same digit. The mapping from images to labels is preserved. A network can, in principle, learn to classify the scrambled images just as well as the originals. Second, why it's hard for a system that has already learned. A system that had learned the unscrambled images would see its performance severely decreased, because the pixel it relied on to spot the top bar of a seven now carries some unrelated part of the picture.

**DEV:** My favorite analogy in the book, and of course it's an airport. Analogy, labelled: the gate renumbering. Imagine an airport where every gate number is reassigned overnight. Consistently: every sign, every boarding pass, every screen. Nothing about which flight goes where has actually changed. A newcomer arriving that morning can learn the layout fine. But a veteran who memorized "Riyadh departs from gate twelve" has to relearn the map. And Permuted MNIST asks: after the hundredth reassignment, can the veteran still learn the new map as fast as a newcomer?

*[TAPE: Capt. Rashid Al-Harbi, continued]*

**DEV:** Captain, where does it break?

**CAPT. AL-HARBI:** Two places. First, in a real terminal, gates twelve and thirteen stay next to each other; renumbering doesn't move the corridor. In Permuted MNIST, neighboring pixel positions end up carrying unrelated pixels, so the layout itself is destroyed. As I understand it from the book, that matters less than you'd think, because a fully-connected network doesn't exploit pixel layout anyway.

**CAPT. AL-HARBI:** Second: a human veteran might change strategy after a hundred renumberings and simply read the screens. Whether the network adapts or wears down, the analogy can't tell you. Only the experiment can.

**MIRIAM:** Then let's run the experiment. The protocol.

**LUCÍA:** Four steps. The book points to panel a of Figure 3.1 for this, and we'll describe that panel in a moment. One: draw a permutation, scramble all the images with it. That's task one. Two: train the network for a single pass through the dataset, so each image is seen once per task. Three: draw a new permutation. The network keeps its current weights, nothing is reset, and it continues learning on the newly scrambled images. That's task two. Four: repeat for many tasks.

*[AMBIENCE: archive room, page turns]*

**THE ARCHIVIST:** For the record. This design was first introduced by Goodfellow and colleagues in 2014, to study catastrophic forgetting: the tendency of a network to lose old skills when it learns new ones.

**MIRIAM:** And the thesis repurposes it.

**THE THESIS:** From the thesis, adapted. The aim here is different: to study the ability to learn of systems trained on non-stationary data, that is, data whose underlying pattern changes over time.

**DEV:** So same bench, different question.

**LUCÍA:** The book puts the difference in two sentences I love. Forgetting asks, "can you still do the old task?" This thesis asks, "can you still learn the new one?"

**DEV:** Airport terms: forgetting is "do you remember last month's gate map?" Plasticity is "can you still learn this morning's?"

*[SFX: soft chime]*

**LUCÍA:** Toy Box, part two. The yardstick for the rest of the series.

**LUCÍA:** Accuracy is the fraction of images classified correctly, and it's the main indicator of how well the system is learning. But the thesis computes it in a specific way. Remember that training proceeds in mini-batches, small groups of images processed together. On each mini-batch, accuracy is measured before the network updates its parameters on that mini-batch.

**DEV:** Before.

**LUCÍA:** Before. That's called online accuracy. It's a score on images the network hasn't trained on yet, gathered as learning happens, with no separate test step. Then the score for a whole task is the online accuracy averaged over all the mini-batches of that task. That's the average online accuracy.

**DEV:** Numbers, please.

*[SFX: four cards dealt onto a table, one at a time]*

**LUCÍA:** Toy example from the book. Pretend a task had only four mini-batches, thirty images each. Before each update, the network gets fifteen right, then twenty-one, then twenty-four, then twenty-seven. Dev, turn those into percentages.

**DEV:** Fifteen out of thirty is fifty percent. Twenty-one is seventy. Twenty-four is eighty. Twenty-seven is ninety.

**LUCÍA:** And the average online accuracy for the task?

**DEV:** Fifty plus seventy plus eighty plus ninety is two-ninety. Divided by four... seventy-two point five percent.

**LUCÍA:** Seventy-two point five. Early mini-batches count as much as late ones, so a slow starter is punished. This number rewards a network that learns each new task quickly. Which is exactly what plasticity is about.

**MIRIAM:** In equation form, Lucía, for the show notes?

**LUCÍA:** The book gives no numbered equation in these chapters, so I'll say it in words and we'll print it as an unnumbered definition. The average online accuracy for a task equals one over the number of mini-batches in the task, times the sum, over every mini-batch in the task, of the fraction of that mini-batch's images classified correctly by the network as it stood just before updating on that mini-batch.

**DEV:** Symbols?

**LUCÍA:** A capital B for the number of mini-batches in the task. Little b counts them off, one to B. For each one, you count correct predictions, divide by the mini-batch size, which in this chapter is thirty. Then you average those B fractions. That's the whole thing.

**MIRIAM:** And the question the whole chapter hangs on?

**THE THESIS:** From the thesis, adapted. How does the average online accuracy change as the system continues to learn from new tasks?

*[MUSIC: explainer bed drops to a low pulse]*

**MIRIAM:** Before running the experiment, the thesis writes down what each possible answer would look like. Three hypothetical scenarios, all assuming every task is equally difficult.

**LUCÍA:** Scenario one: no loss of plasticity. The curve of average online accuracy stays roughly flat from task to task. The system learns each new task as well as it learned the first. Scenario two: no loss, plus shared structure. The curve rises across tasks. That's positive transfer.

**DEV:** Define positive transfer.

**LUCÍA:** Positive transfer means information learned on one task helps with learning future tasks. Scenario three: slow loss of plasticity. The curve declines gradually as tasks are added. The system is getting worse at learning.

**DEV:** And these three have colors.

**LUCÍA:** In the figure, yes. Blue is flat, yellow rises, black falls. Hold on to those colors.

**MIRIAM:** Now the experiment itself. The book's phrase for the real system is "deliberately ordinary."

**LUCÍA:** And there's a careful argument for why. Because a fully-connected network does not exploit spatial information between pixels, each task should be equally difficult for it. That means any decline has to come from the learner, not from the tasks.

*[SFX: ledger bell]*

**THE AUDITOR:** A note for the file, not a slip. The book marks "each task should be equally difficult" as the thesis's own wording: an expectation argued from the fact that a fully-connected network ignores pixel layout. We report it as the thesis states it.

**MIRIAM:** Noted. Lucía, the configuration.

**LUCÍA:** Eight settings. Architecture: three fully-connected hidden layers, one hundred ReLU units each. Loss: cross-entropy between the predictions and the labels. Optimizer: stochastic gradient descent, SGD. Step-size: zero point zero five. Mini-batch size: thirty. Weight initialization: Kaiming normal, from He and colleagues, 2015. Bias initialization: zero. Independent runs: thirty.

**DEV:** Lightning-round refresher, because Episode Two was a while ago for some people.

**LUCÍA:** ReLU: output equals input if positive, zero otherwise. Cross-entropy: the standard error score for classification, low when the network puts high probability on the correct label. SGD: nudges every weight a little against the gradient of the loss on each mini-batch. Step-size, alpha: how big each nudge is. Kaiming normal: starting weights drawn from a bell curve whose spread is matched to the layer size, designed for ReLU networks. Independent runs: the whole experiment repeated thirty times with different random seeds.

**MIRIAM:** That last one deserves its own witness.

*[TAPE: Dr. Sun-Hee Park, recorded in a seminar room, chalk audible]*

**DR. PARK:** Thirty runs is the quiet hero of this chapter. Run once, and a falling curve might just be bad luck in the draw of starting weights. Run thirty times with different seeds and average, and in the book's words, the result reflects the method, not luck.

**MIRIAM:** And the shaded band around the curve?

**DR. PARK:** That's one standard error above and below the average. The book describes it as a measure of how precisely thirty runs pin the average down. Note: it's the precision of the average, not the spread of individual runs. When you hear "one standard error" in later episodes, think "how tightly the average is pinned."

**DR. PARK:** Quick one for you, Dev: double the runs, and the band?

**DEV:** Thinner?

**DR. PARK:** Thinner.

*[MUSIC: theme, low cello, ominous — 21:30]*

**MIRIAM:** Now. The figure. Figure 3.1 in the thesis. Three panels. Dev.

**DEV:** Audio figure, Figure 3.1. Panel a is a cartoon of the protocol. Task one: pixels are permuted, and the network trains on the permuted images. Task two: a new permutation is applied, and the network continues learning. And the process continues for several tasks.

**LUCÍA:** Panel b is the one people misread. It is a sketch, not data. Say it with me.

**DEV:** A sketch, not data.

**LUCÍA:** The x-axis is the permutation number, task one to task ten. The y-axis is average online accuracy per task, but it has no numbers on it, just "Bad" at the bottom and "Good" at the top. Three lines. A yellow line that rises: a system that exploits shared structure. A blue line that stays flat: no loss of plasticity. A black line that falls: loss of plasticity. These are the three scenarios we just described, drawn before seeing any data.

**DEV:** And panel c, on the right, is the real thing. X-axis: permutation number, one to one hundred. Y-axis: average online accuracy per task, running from eighty-eight percent at the bottom to ninety-three at the top. One curve, averaged over thirty runs, with a thin shaded band, one standard error above and below.

**MIRIAM:** And what does the curve do?

**DEV:** It doesn't match any of the three sketches. It shows traits of all three. Over the first few tasks, it rises, like the yellow line: positive transfer. Then it stays flat for a few tasks, like blue. And then it declines, persistently, like black. Read off the chart: it peaks close to ninety-three percent early, and by task one hundred it has fallen below eighty-nine percent.

**LUCÍA:** And the book adds that the decline continued to the end of the experiment, and may well have continued had the experiment run longer.

*[SFX: rising tone that thins and flattens]*

**NORA:** I remember those first tasks. The second scramble felt easier than the first. I thought: I'm getting good at this. Then it stopped getting easier. And then, so slowly I couldn't point to the moment, every new map took a little longer to read.

**UNIT 47:** Some of us noticed before she did.

**UNIT 12:** Not now, Forty-Seven.

**UNIT 47:** I'm just saying. Some of us got quiet.

**MIRIAM:** We'll take the Units' testimony in the next episode. For now, the bare finding.

**THE THESIS:** From the thesis, adapted. The same network, on tasks of equal difficulty, becomes steadily worse at learning.

**MIRIAM:** That is loss of the ability to learn, observed directly. That is the crime.

*[BEAT]*

**DEV:** But the curve goes up first. Isn't she fine at the start?

**LUCÍA:** The book anticipates exactly that. The early rise does not prove the network isn't losing plasticity early on. The rise reflects positive transfer. Plasticity loss may already be under way, just masked by the transfer. 

**MIRIAM:** And the book says it returns to that point when it discusses how plasticity loss should be measured, which in this series is Episode Five.

**DEV:** So a rising curve isn't an alibi.

**LUCÍA:** A rising curve is not an alibi.

### Act Three — The Line-Up

*[MUSIC: explainer bed, brisker — 27:00]*

**MIRIAM:** One sighting is not a pattern. A sceptic would say: you picked a bad setting. The book's Chapter 7, thesis section 3.2, answers the sceptic by changing every major design choice, one at a time, and checking whether the decline survives.

**DEV:** It's a line-up. Four suspects.

**LUCÍA:** And bigger stakes. Every experiment in this part runs for one thousand tasks. That's ten times longer than Figure 3.1c. And every curve averages thirty runs.

*[TAPE: Capt. Rashid Al-Harbi, continued]*

**CAPT. AL-HARBI:** Analogy, labelled: the root-cause audit. When a defect shows up in one plant, the auditor checks whether it also appears with different suppliers, different shift patterns, different machines, different operators. If the defect appears under every combination, the cause lies deeper than any single choice. In maintenance we'd say: stop replacing the part and look at the system.

**MIRIAM:** And where does it break?

**CAPT. AL-HARBI:** An auditor usually ends with a root cause. This chapter only rules things out: the cause lies deeper than any of these knobs. And strictly, it changes one choice at a time, not every combination. A careful audit, not an exhaustive one.

*[SFX: a door buzzer, interview-room style]*

**DEV:** Suspect number one. The step-size.

**LUCÍA:** Alpha. The size of each learning nudge in SGD. The suspicion is that zero point zero five was simply a poor choice, and some other value wouldn't produce such a drastic decline. So the thesis trains the same system, three hidden layers of a hundred ReLU units, SGD, with five step-sizes: zero point zero zero one, zero point zero zero five, zero point zero one, zero point zero five, and zero point one.

**DEV:** And?

**LUCÍA:** Three findings. First: every system eventually declined. Second: with the smallest step-size, zero point zero zero one, the decline was slow, so plasticity loss was significantly reduced. But accuracy was low throughout, which makes that a less desirable option. Third, the general rule: high step-sizes gave good performance at the cost of greater plasticity loss. Low step-sizes slowed plasticity loss at the cost of lower performance.

**DEV:** So you can buy slower decay, but you pay in being bad all the time.

**LUCÍA:** The book's phrase: a trade-off, not an escape. A small step-size slows the damage mainly by slowing learning itself.

*[TAPE: Prof. Tomás Adeyemi, recorded in his office]*

**PROF. ADEYEMI:** The step-size scales every change to the weights. Make it tiny and, in a single pass through each task, the network changes little, and online accuracy rewards learning quickly. Slow to decline and slow to learn, for one reason. Not cured. Sedated.

**DEV:** That's going on a mug.

*[MUSIC: explainer bed drops out]*

**MIRIAM:** A procedural question first. When the thesis says it "tuned" something, what exactly did it do? Tune one method carefully and another sloppily, and you can make anything look bad.

*[TAPE: Dr. Sun-Hee Park, continued]*

**DR. PARK:** First, a definition. A hyperparameter is a setting chosen by the experimenter rather than learned by the network. The step-size, the momentum term, the regularization strength, and so on. Comparing methods fairly requires tuning each one's hyperparameters properly. Otherwise a method can look bad simply because it was run with poor settings.

**MIRIAM:** And the thesis has a fixed procedure.

**DR. PARK:** The same three steps in every experiment in the thesis. Step one, the wide sweep. You test a wide range of values with a single run each, to find a sensible range where the algorithm learns reasonably well.

**DEV:** Define "reasonably well." That sounds like a weasel word.

**DR. PARK:** It would be, if the thesis left it there. It doesn't. "Reasonably well" means two concrete things: the optimization does not diverge, meaning the numbers don't blow up to useless values, and performance is better than random. That's the bar for surviving step one.

**DEV:** Next?

**DR. PARK:** The grid search. Within that sensible range, you test every combination of values, using multiple independent runs, between five and ten. Step three: pick the best. Identify the combination with the highest average performance. The thesis calls that the best hyperparameter combination.

**MIRIAM:** And then?

**DR. PARK:** And then a confirmation stage. The algorithm is run with the best combination for several additional independent runs, typically reaching a total of fifteen to thirty runs. How many runs go into the grid search and the final step depends on how noisy the problem is and how much each run costs.

**LUCÍA:** The book has a small diagram for this, captioned "3 steps, then confirmation runs." Audio walkthrough: the flow narrows from many cheap single runs, to a grid of five-to-ten-run comparisons, to one winning setting, which is then confirmed with additional runs until the total reaches fifteen to thirty. The curves in the figures average that total.

**MIRIAM:** And the actual values?

**DR. PARK:** The thesis keeps them out of the main text except where they matter for the analysis. Appendix A gives every value tested; for Figure 3.2 they're in Table A.1, which we'll tour in the bonus episode. One preview from the book's appendix guide: in these Permuted MNIST searches, the score was the area under the average-online-accuracy curve, so a method that starts well but decays is penalized.

*[SFX: door buzzer]*

**DEV:** Suspect number two. Network size.

**MIRIAM:** We brought in our engineering witness for this one.

*[TAPE: Dr. Priya Venkataraman, recorded on a video call, keyboard in background]*

**DR. VENKATARAMAN:** Conventional wisdom in deep learning holds that scaling up the number of parameters leads to significant performance improvements. The book cites Kaplan and colleagues, 2020, a study of how language-model performance grows with model size. So the natural hope is: maybe a bigger network mitigates plasticity loss, or even removes it.

**LUCÍA:** The thesis tests three fully-connected networks, three hidden layers of ReLU units, at ten, one hundred, or one thousand units per layer. And for each one, the SGD step-size was tuned to maximize the average online accuracy over all one thousand tasks.

**DR. VENKATARAMAN:** Three findings. Bigger networks scored higher, and they declined more slowly as tasks accumulated. But all three still lost some plasticity.

**DEV:** So scale helps.

**DR. VENKATARAMAN:** Scale helps. Increasing the number of units further would likely prevent plasticity loss within one thousand tasks. But two catches. It would cost more computation, and it may not resolve the problem for a larger number of tasks.

**DEV:** Within. That's the word doing the work.

**DR. VENKATARAMAN:** "Within" is the whole story. A system that keeps learning faces an open-ended sequence. If size only buys time, you've bought time, not a cure.

**LUCÍA:** The book's analogy, labelled: a bigger warehouse delays the day you run out of shelf space, but if goods keep arriving and nothing ever leaves, it only postpones the problem.

**MIRIAM:** Captain, does that analogy hold?

**CAPT. AL-HARBI:** It holds on the main point: capacity delays, it doesn't cure. Where it breaks: you can walk into a warehouse and count the empty shelves. Nothing in this chapter tells us what, if anything, is "filling up" inside a network. That's the next investigation.

*[SFX: door buzzer]*

**DEV:** Suspect number three. The optimizer. Professor, this is your territory.

*[TAPE: Prof. Tomás Adeyemi, continued]*

**PROF. ADEYEMI:** The optimizer is the rule that turns gradients into weight updates. We built all three of these in Episode Two, so briefly. Plain SGD steps against the current gradient. Its only tuned hyperparameter is the step-size, and the value in the figure legend is alpha equals zero point zero five. SGD with momentum steps against a running average of recent gradients, which smooths and speeds up the movement. Two tuned hyperparameters, the momentum term and the step-size. Legend values: momentum zero point nine, alpha equals zero point zero zero five.

**LUCÍA:** A tenth of SGD's step-size.

**PROF. ADEYEMI:** A tenth, yes. Each optimizer gets its own tuned step-size; the numbers are not interchangeable. And Adam adapts the step for each weight separately, using running averages of the gradients, controlled by a factor called beta-one, and of the squared gradients, controlled by beta-two. Adam's beta-one, beta-two and step-size were tuned jointly. Legend values: beta-one zero point nine, beta-two zero point nine nine nine, alpha zero point zero zero zero five.

**DEV:** And every one of them is on the three-by-one-hundred ReLU network.

**PROF. ADEYEMI:** All three on the same network. And the finding is almost dull in its consistency. Regardless of optimizer, performance rose during the first few tasks, then decreased for the rest of the experiment. The steady decrease means all three systems lost plasticity.

**DEV:** Adam too? Adam's the fancy one.

**PROF. ADEYEMI:** Adam too. The figure will show it.

*[SFX: door buzzer]*

**DEV:** Suspect number four. The activation function.

**LUCÍA:** The nonlinear function, call it g, that each unit applies to its weighted input. It's an architectural choice that often has a drastic impact on performance. So far, everything was ReLU. The thesis now tests six. I'm going to do these as shapes, because it's audio.

*[SFX: marker squeaking on a whiteboard]*

**LUCÍA:** ReLU, the baseline: flat zero for negative inputs, the input itself for positive inputs. A hockey stick. Sigmoid: an S-curve that squeezes any input into the range zero to one. Tanh: an S-curve that squeezes any input into minus one to one. Leaky ReLU, cited to Maas and colleagues, 2013: like ReLU, but instead of flat zero for negative inputs, a small slope. GELU, cited to Hendrycks and Gimpel, 2016: a smooth ReLU-like curve with a small dip below zero for negative inputs. And SiLU, cited to Hendrycks and Gimpel, 2016, and Ramachandran and colleagues, 2017: a smooth ReLU-like curve, similar to GELU.

**DEV:** And there's an initialization wrinkle.

**LUCÍA:** Kaiming normal initialization, He and colleagues, 2015, draws starting weights with a spread tuned for ReLU-type units. Xavier initialization, Glorot and Bengio, 2010, uses a spread designed to keep signal sizes balanced across layers. ReLU, sigmoid, tanh and leaky ReLU networks all used Kaiming normal. SiLU and GELU networks used Xavier.

**DEV:** Why the special treatment?

**LUCÍA:** Because Xavier is more common in the literature for SiLU and GELU. That's the whole reason. And in every case, bias vectors start at zero. The architecture is three fully-connected layers of one hundred units each, and the SGD step-size was tuned separately for each activation.

**MIRIAM:** And the result?

**LUCÍA:** The same rise, then the same steady decline. Different activations decline at different slopes, but every system lost plasticity.

*[MUSIC: theme, low cello — 39:00]*

**MIRIAM:** Now we put all four line-ups on the wall at once. Figure 3.2. Four panels. Before we describe them, the Auditor has asked for the floor.

*[SFX: ledger bell]*

**THE AUDITOR:** For the file. Every value you are about to hear for Figure 3.2 is read off the chart and approximate. The book says so plainly: the thesis text gives no exact end-point numbers. If you hear "about eighty-three and a half percent," it means a careful reading of a plotted line, not a figure stated in the thesis. The same applies to the Figure 3.1c readings given earlier. I find no slip in these two chapters. I find only the need for that caveat.

**MIRIAM:** Thank you. Lucía and Dev, take it panel by panel.

**DEV:** Shared axes first. All four panels: the x-axis is the permutation, or task, number, from one to one thousand. The y-axis is average online accuracy per task, averaged over thirty runs. There are shaded bands, one standard error from the mean, but they're mostly too thin to see. Which, per Dr. Park...

**LUCÍA:** ...means the averages are tightly pinned. The hyperparameters are in Table A.1.

**DEV:** Panel a: different step-sizes. Y-axis from seventy-five to ninety-two and a half percent. Five lines. Black is step-size zero point zero five, our familiar baseline. It starts highest, near ninety-two and a half percent, and falls to about eighty-three and a half by task one thousand. Orange, zero point zero one, peaks near ninety percent and ends close to black. Blue, zero point zero zero five, peaks near eighty-seven and a half and ends near eighty-two and a half. Green, zero point one, the biggest step, peaks high but falls fastest, ending near eighty-two percent. And yellow, zero point zero zero one, never rises above about seventy-eight percent and drifts down slowly to about seventy-six and a half. All read off the chart.

**LUCÍA:** Yellow is the sedated network. Green learns hard and burns out fastest.

**DEV:** Panel b: different network sizes. Y-axis from seventy-five to ninety-five percent. Green is one thousand units per layer. It sits near ninety-four percent and slides gently to about ninety-two. Black is one hundred units, starts near ninety-two and a half, falls to about eighty-three and a half. Same as the black line in panel a; it's the same baseline. Orange is ten units per layer: it's noisy, starts near eighty-six percent and settles around seventy-seven. Read off the chart.

**LUCÍA:** Green slides gently, but it slides.

**DEV:** Panel c: different optimizers. Y-axis from eighty-two to ninety-four percent. All three peak near ninety-two to ninety-three percent within the first tasks. Then they separate. Adam, in orange, declines more slowly at first, but then crosses below SGD and ends lowest, near eighty-two and a half percent. SGD with momentum, in green, declines fastest early and ends near eighty-three. Plain SGD, in black, ends highest, near eighty-three and a half. Read off the chart.

**DEV:** Panel d: different activations. Y-axis from eighty to ninety-four percent. Six lines. SiLU, yellow, starts near ninety-two and a half percent and stays highest, ending near eighty-six. Sigmoid, blue, is the odd one: it rises slowly from a low start to about eighty-eight percent and then ends near eighty-five. GELU, pink, and leaky ReLU, orange, end near eighty-four and a half to eighty-five. ReLU, black, ends near eighty-three and a half. And tanh, green, ends lowest, near eighty-two percent. Read off the chart.

**MIRIAM:** The book's one-line verdict on this figure: no setting tested escapes the decline. Some choices raise the curve, some flatten its slope, but every curve bends downward over one thousand tasks. And the best-looking fix, a ten-times larger network, slows the loss without stopping it.

*[SFX: rising tone that thins and flattens, stretched long]*

**NORA:** You can give me bigger steps or smaller steps. You can give me ten times the room. You can give me Adam. You can swap the shape of every neuron I have. I'll still be slower on the thousandth map than I was on the tenth. I don't know why. I would like someone to find out why.

**UNIT 88:** We might know a little about why.

**UNIT 47:** Next week.

### Act Four — The Verdict So Far

*[MUSIC: "Still Learning" theme, sparse — 46:00]*

**MIRIAM:** So the four experiments establish one thing: a wide range of learning systems based on fully-connected networks lose plasticity on Permuted MNIST. Which raises the natural next question, the one the thesis itself asks at this point.

**THE THESIS:** From the thesis, adapted. Is plasticity loss an inherent property of deep learning, or can it be prevented?

**MIRIAM:** The chapter's verdict already told us: it can be prevented, at least in fully-connected networks. But first the thesis examines what else changes inside the network as plasticity is lost.

*[MUSIC: explainer bed, soft]*

**DEV:** Before we wrap, we got a listener question that fits right here. It's from a listener who works in quality control, and she writes: "If the network is getting worse on new tasks, how do you know it isn't just that the later permutations happen to be harder? Some shuffles must be nastier than others."

**LUCÍA:** Great question, and the book gives two lines of defense. First, the argument we heard earlier: a fully-connected network doesn't exploit the spatial arrangement of pixels. Every unit sees every pixel anyway. So, from the network's point of view, one shuffle is no nastier than another; each task should be equally difficult for it. That's the thesis's wording, as the Auditor told us. Second, the permutations are drawn at random, fresh for each task, and the curves average thirty independent runs, each with its own random seed.

**DR. PARK:** And, a statistician's addition: a few nasty shuffles would make dips, not a steady thirty-run-average slope over a thousand tasks.

*[MUSIC: theme returns]*

**MIRIAM:** So here is where the investigation stands. A fair test bench. A yardstick that rewards learning quickly. A witnessed crime. And four easy explanations ruled out. Next, we open the network up.

### Three Things to Remember

**LUCÍA:** One. Permuted MNIST takes one easy dataset and turns it into an endless run of equally hard tasks: one fresh pixel shuffle per task, applied to every image, labels unchanged. Plasticity is measured by average online accuracy: score each mini-batch before training on it, then average across the task. Flat means plasticity is kept, rising means positive transfer, falling means plasticity is being lost.

**DEV:** Two. The standard network, three layers of a hundred ReLU units, SGD, step-size zero point zero five, mini-batches of thirty, thirty runs, rises, plateaus, then declines steadily. Read off the chart: from close to ninety-three percent early to below eighty-nine by task one hundred, and still falling.

**MIRIAM:** Three. It happens everywhere. Over a thousand tasks, every fully-connected system tested lost plasticity. Small steps only slow it by slowing learning. A ten-times larger network slows it without stopping it. SGD, momentum and Adam all decline. Six activations, six declines. And every one was fairly tuned: wide sweep, grid search, best combination, confirmed to fifteen to thirty runs.

### Check Your Understanding

*[SFX: soft chime]*

**LUCÍA:** Eight questions. Pause after each one if you like. Answers follow.

**LUCÍA:** Question one. Why does applying the same permutation to every image keep the task learnable?

**LUCÍA:** Question two. Why is online accuracy measured before the update on each mini-batch, rather than after?

**LUCÍA:** Question three. Why does the thesis stress that a fully-connected network finds every permuted task equally difficult?

**LUCÍA:** Question four. The real curve in Figure 3.1c first rises. Does that rise prove the network is not losing plasticity early on?

**LUCÍA:** Question five. Why is "use a very small step-size" not a satisfactory fix?

**LUCÍA:** Question six. What does the thesis mean by "learning reasonably well" in step one of hyperparameter tuning?

**LUCÍA:** Question seven. Why does the thesis doubt that simply making networks bigger is the answer, even though bigger networks did better?

**LUCÍA:** Question eight. Why were SiLU and GELU networks initialized differently from the others?

*[MUSIC: explainer bed, ten-second pause]*

**DEV:** Answers. One: every image of a given digit is scrambled identically, so the image-to-label mapping is unchanged. Only which pixel position carries which information changes.

**LUCÍA:** Two: scoring before the update measures performance on data the network hasn't trained on yet. So it rewards learning quickly, and it isn't inflated by memorizing the batch just seen.

**DEV:** Three: equal difficulty means any downward trend must come from the learner losing ability, not from the tasks getting harder.

**LUCÍA:** Four: no. The early rise reflects positive transfer. Plasticity loss may already be under way, masked by it. The book returns to this when it discusses how to measure plasticity loss, in our Episode Five.

**DEV:** Five: it slows plasticity loss mainly by slowing learning overall, so accuracy is low throughout. About seventy-six to seventy-eight percent in Figure 3.2a, read off the chart.

**LUCÍA:** Six: the optimization doesn't diverge, and performance is better than random.

**DEV:** Seven: even one thousand units per layer still declined. More units would cost more computation and might only postpone the problem for longer task sequences.

**LUCÍA:** Eight: Xavier initialization, Glorot and Bengio, 2010, is more commonly used with SiLU and GELU in the literature. The other activations used Kaiming normal, He and colleagues, 2015.

### Credits and Next Time

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano]*

**MIRIAM:** Still Learning is a documentary series adapted from the guided book *Keeping Neural Networks Learning*, which teaches the PhD thesis *Selective Reinitialization Algorithms for Preventing Plasticity Loss in Artificial Neural Networks*, University of Alberta. The thesis is © Juan Fernando Hernandez Garcia, 2026, licensed CC BY 4.0, adapted here with credit. The thesis code is at github.com/JFernando4/plasticity-via-reinit. All experts and actors in this series are fictional. Our experts this episode were Dr. Sun-Hee Park, Prof. Tomás Adeyemi, Dr. Priya Venkataraman and Capt. Rashid Al-Harbi. Nora was voiced by Nell Varga, The Thesis by Graham Asante, The Archivist by Ruth Kellerman, and The Auditor by Samir Haddad, with The Units ensemble.

*[BEAT]*

**MIRIAM:** Next time, on Still Learning. We have watched the crime happen. Now we examine the body. As Nora's accuracy falls, four other things inside her change: four symptoms, each measurable, each a suspect. And then the first remedies, older techniques that were never designed for this problem, put to the test. Two of them, as the thesis has already told us, succeed.

**UNIT 47:** Told you some of us got quiet.

**MIRIAM:** Episode Four: Four Symptoms, First Remedies.

*[MUSIC: theme resolves, out]*

### Show Notes

**Episode 3 — The Shuffle.** Book Chapters 6–7; thesis Chapter 3 opening, §3.1 (pp. 14–16) and §3.2 (pp. 17–19). Figures 3.1 and 3.2; hyperparameters for Figure 3.2 in Table A.1 (Appendix A).

**Equations.** Thesis §3.1 and §3.2 contain no numbered equations, no algorithms and no numbered tables (Table A.1 is in the appendix). The one formula spoken on air is the book's definition of the yardstick, printed here as an unnumbered definition, followed by the book's toy example.

Average online accuracy for a task (unnumbered; book Chapter 6, thesis §3.1). B is the number of mini-batches in the task; for mini-batch b, correct_b is the number of its images classified correctly by the network as it stood before updating on that mini-batch, and n is the mini-batch size (30 in the first experiment).

```latex
\text{AvgOnlineAcc} = \frac{1}{B}\sum_{b=1}^{B}\frac{\text{correct}_b}{n}
```

Toy example (unnumbered; book Chapter 6): four mini-batches of 30 images, with 15, 21, 24 and 27 correct.

```latex
\frac{1}{4}\left(\frac{15}{30}+\frac{21}{30}+\frac{24}{30}+\frac{27}{30}\right) = \frac{50\% + 70\% + 80\% + 90\%}{4} = 72.5\%
```

**Audio figures and walkthroughs in this episode.**

| Item | One line |
| --- | --- |
| Book diagram: Permuted MNIST, "one shuffle per task, labels unchanged" | One random pixel shuffle per task, applied identically to every image; every label stays the same. |
| Figure 3.1a | The protocol: permute, train on task 1; new permutation, keep weights, continue on task 2; repeat for many tasks. |
| Figure 3.1b | A sketch, not data: tasks 1–10, accuracy from "Bad" to "Good"; yellow rises (positive transfer), blue flat (no loss), black falls (loss of plasticity). |
| Figure 3.1c | Real result, tasks 1–100, y-axis 88%–93%, 30 runs, one-standard-error band: rises, plateaus, then declines; read off the chart, peaks close to 93% and is below 89% by task 100. |
| Book diagram: hyperparameter tuning, "3 steps, then confirmation runs" | Narrows from a wide sweep of single runs, to a grid search with 5–10 runs, to the best combination, then confirmation runs to a total of 15–30. |
| Figure 3.2a | Five step-sizes over 1,000 tasks: all decline; 0.001 lowest and flattest; 0.1 falls fastest. |
| Figure 3.2b | Widths 10, 100, 1,000: bigger is higher and declines more slowly, but all decline. |
| Figure 3.2c | SGD, SGD with momentum, Adam: all peak near 92–93% then decline; plain SGD ends highest. |
| Figure 3.2d | Six activations: same rise-then-decline; SiLU ends highest, tanh lowest. |

**How the thesis chapter maps onto the book.**

| Thesis section | Book chapter | Question answered |
| --- | --- | --- |
| Opening + §3.1 | Chapter 6 | How do we see and measure plasticity loss? |
| §3.2 | Chapter 7 | Is it a quirk of one setup, or widespread? |
| §3.3 | Chapter 8 | What else changes inside the network as it happens? |
| §3.4 | Chapter 9 | Do existing techniques prevent it? |
| §3.5–§3.6 | Chapter 10 | Who saw it before, how should it be measured, and what follows? |

**Table A.1 reference.** Table A.1 (Appendix A) holds the grid search behind Figure 3.2 (and later Figures 3.4 and 3.6). Selected values, per the book's Appendix A guide: step-size 0.05 for every network size; SGD 0.05; SGD with momentum 0.005 with momentum 0.9; Adam 0.0005 with β₁ = 0.9, β₂ = 0.999; ReLU, sigmoid, leaky ReLU and SiLU 0.05; tanh and GELU 0.01. The search was guided by the area under the average-online-accuracy curve. The full appendix is covered in the bonus episode, "The Fine Print."

**Corrections and caveats.** No slips are flagged by the book in Chapters 6–7. Caveats noted on air by The Auditor: "each task should be equally difficult" is the thesis's wording; all Figure 3.1c and Figure 3.2 values are read off the chart; Figure 3.1b is a sketch, not data.
