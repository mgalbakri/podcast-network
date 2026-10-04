---
number: 8
title: The Picture Problem
slug: 08-the-picture-problem
summary: Out of the lab and into images. Convolutional networks on two thousand picture-sorting tasks, seven training runs that blew up, the single outlier that caused it, and the fix that worked best of all.
coverage: 'Covers book chapter 19 (thesis Chapter 6 opening and §6.1–§6.6, pp. 93–109). Convolutional networks meet Continual ImageNet: two thousand two-way picture-sorting tasks, a fragile baseline, three reinitialization algorithms, seven runs that blew up, the outlier that caused it, three remedies, the four warning lights, the trail of earlier sightings, and the practical case for continuous pre-training.'
interests:
- ai
- science
estimatedMinutes: 52
status: in-production
---

### Cold Open

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano]*

*[AMBIENCE: a quiet room, the faint whir of a cooling fan]*

**MIRIAM:** For seven episodes, every piece of evidence in this investigation came from the same kind of machine. A fully-connected network. Every unit in one layer wired to every unit in the next. Small. Tidy. Built for the lab.

**MIRIAM:** And for seven episodes, the skeptics have had a ready answer. Real systems don't look like that. Real systems see pictures.

*[BEAT]*

**MIRIAM:** They have a point. Image systems are built from a different part: the convolutional layer. If plasticity loss is a quirk of toy wiring, it should vanish here. If the cure works only on toys, it should fail here.

**THE THESIS:** From the thesis, adapted. The earlier chapters showed that plasticity loss is widespread and that selective reinitialization prevents it, but only in fully-connected networks, which "differ from the contemporary systems used in practice."

**MIRIAM:** So the investigation leaves the lab. Two thousand tasks. Alligators and guitars, bison and bow ties. And a set of runs that did not fade. They blew up.

*[SFX: a rising whine, then a hard digital crackle, then silence]*

**DR. VENKATARAMAN:** The loss was sitting near zero. Within a few epochs it shot past one hundred. Then the numbers stopped being numbers.

**MIRIAM:** This is the story of the picture problem. What breaks, what holds, and the one rule of thumb that turned out to be a trap.

*[MUSIC: title sting]*

**MIRIAM:** I'm Miriam Okafor. This is STILL LEARNING. Episode Eight: The Picture Problem.

### Act One — A Chain of Look-Alike Pairs

*[MUSIC: explainer bed — plucked bass, light percussion]*

**DEV:** Confession: I only mostly understand what a convolution is.

**LUCÍA:** We'll fix that in Act Two. First, the exam that can catch a network losing plasticity.

**MIRIAM:** The thesis lays out what this chapter will do in three steps. Graham.

**THE THESIS:** From the thesis, adapted. First, build a continual binary classification problem from the ImageNet image collection and show that convolutional networks lose plasticity on it. Second, test the three selective reinitialization algorithms: continual backpropagation stays robust, while ReDo and selective weight reinitialization succeed but show learning instabilities. Third, show that combining regularization with selective reinitialization removes the instabilities and improves performance.

**MIRIAM:** "Learning instabilities": runs that suddenly fall apart. Hold onto that.

**LUCÍA:** And a note on lineage. This chapter extends work the author co-published in *Nature*, Dohare and colleagues, 2024. The extension is specific: evaluate ReDo and selective weight reinitialization on a different downsampled ImageNet dataset, with a different convolutional architecture.

**DEV:** Quick roll call of our three remedies.

**LUCÍA:** Continual backprop resets whole units, a fixed small share at a time, chosen by contribution utility: how much a unit's output feeds the next layer. ReDo resets whole units whose activation utility, their average absolute output, falls below a threshold. And selective weight reinitialization, SWR, resets individual weights rather than whole units.

**DEV:** Units, units, weights. Got it.

#### The test bed

**MIRIAM:** The test bed is called Continual ImageNet. Its raw material is ImageNet, a popular benchmark for computer vision models, introduced by Deng and colleagues in 2009.

**DR. VENKATARAMAN:** Many classes, many examples, high-dimensional data: every image is a lot of numbers. So it suits state-of-the-art systems. The thesis repurposes it into a continual learning problem.

**DEV:** Walk me through the rules, Priya.

**DR. VENKATARAMAN:** Four rules. One: at the start, the system must distinguish two types of object. Pictures of one animal versus another, say. Two: once performance has plateaued, a new pair of objects is selected. That new binary classification problem is a new task. Three: repeat, for thousands of tasks. Four: after each task, the network's output layer is reset to zero.

**DEV:** You wipe the output layer every time? Isn't that self-sabotage?

**DR. VENKATARAMAN:** Think of it as creating fresh output units for the new classes. Last task's outputs meant "alligator" and "guitar"; this task's mean "bison" and "bow tie." Everything underneath carries forward, and that's the part whose plasticity we're testing.

*[MUSIC: soft transition]*

**DEV:** Audio figure time. Figure 6.1.

**LUCÍA:** A cartoon, not a chart. Four panels, Task 1 to Task 4, each two line drawings with "vs" between them. Task 1: an alligator versus a guitar. Task 2: a game controller versus a fish. Task 3: a bison versus a bow tie. Task 4: a harp versus a koala. The captions say the first pair must be distinguished, then a new pair, and that "the process continues for thousands of pairs of objects." And there are dots on the right, meaning it keeps going.

**DEV:** Harp versus koala. Delightful.

**LUCÍA:** The point is less delightful. To succeed, a learning system must keep its ability to learn for thousands of tasks.

#### The weekly inspector

*[TAPE: Capt. Rashid Al-Harbi, recorded in a hangar office; a distant rivet gun]*

**CAPT. AL-HARBI:** Analogy, labelled. An inspector in a maintenance shop. Every Monday, two look-alike parts on the bench: two brackets that differ by one hole. By Friday, sort them reliably. Next Monday, a new pair.

**DEV:** And the question isn't whether they sort this week's pair.

**CAPT. AL-HARBI:** Correct. The question is whether, after two thousand weeks, that inspector still learns a new pair as fast and as well as they did in week one. That is what Continual ImageNet measures.

**MIRIAM:** Where does the analogy break?

**CAPT. AL-HARBI:** A human doesn't zero their sorting labels every Monday, and brings a lifetime of experience to week one; Nora starts from random weights. It captures the question, not the machinery.

*[MUSIC: explainer bed returns]*

#### How the score is kept

**LUCÍA:** Now, the scoreboard. Accuracy is measured on a test set: images held out from training, so the score reflects what was learned rather than memorized. Within each task the system makes several full passes through the task's training data. Each full pass is an epoch. After every epoch, test accuracy is measured. And the task's score is the average of those per-epoch accuracies. The thesis calls it the average test accuracy.

**DEV:** Why average across epochs? Why not just take the final score?

*[SFX: soft chime]*

**LUCÍA:** Toy Box. Coffee cups, please.

*[SFX: four ceramic cups set on a table]*

**LUCÍA:** A task with four epochs. Cup one: 70 percent. Cup two: 80. Cup three: 85. Cup four: 85. Average test accuracy?

**DEV:** Seventy plus eighty plus eighty-five plus eighty-five is three-twenty. Over four. Eighty.

**LUCÍA:** Eighty percent. A system that hits 85 after one epoch scores higher, with the same final accuracy. The average rewards learning quickly, not just learning well.

**PROF. ADEYEMI:** It mirrors the average empirical loss of thesis Chapter 3, Equation 3.3, from Episode Five.

**DEV:** In words again, Tomás. Briefly.

**PROF. ADEYEMI:** L-hat sub k, the average empirical loss on task k for parameters theta at the start of task k, equals one over tau-sub-k times the sum over the task's steps j, of one over m times the sum over the m mini-batch examples, of the loss ell between the network's prediction on input x and the label y at that step. The hat means estimated from observed data; tau-sub-k is the number of steps in the task; m is the mini-batch size. Two stacked averages: within the batch, then across the task.

#### What the trend should look like

**MIRIAM:** The design has a property that matters a great deal. The classes in each task are sampled at random. So, in expectation, every task is equally difficult.

**DR. PARK:** If tasks are equally hard on average, and classes never repeated, then any change in performance could only come from a change in the system's ability to learn. The thesis lays out three possible outcomes. If the system keeps its ability to learn, the average-performance trend is mostly flat. If it benefits from what earlier tasks taught it, because classes share common attributes, the trend rises. If it loses plasticity, the trend falls as the number of tasks grows.

**DEV:** Flat, up, down. Fine, great, uh-oh.

#### The dataset, exactly

**LUCÍA:** For reproducibility, the thesis names the exact dataset. Tiny ImageNet, by Le and Yang, 2015. A downsampled ImageNet. Downloaded through the Hugging Face datasets Python package, Lhoest and colleagues, 2021.

**LUCÍA:** Two hundred classes. Five hundred training images and fifty test images per class. Every image 64 pixels tall and 64 pixels wide. Most images have three channels: red, green, blue. Some have a single channel. That channel is copied three times, which produces a black-and-white image in three-channel form. After that, every image is 64 by 64 by 3.

Then each channel is normalized: subtract the sample mean, divide by the standard deviation, both computed from the entire training set.

#### The flaw in the exam

*[SFX: ledger bell]*

**THE AUDITOR:** A design caveat, flagged by the thesis itself, so I'll read it into the record. Tiny ImageNet has only two hundred classes. Two hundred classes make one hundred pairs. The two hundred classes are randomly paired into one hundred tasks. After one hundred tasks, the classes are reshuffled into one hundred new pairs, and so on.

**DEV:** So after task one hundred, the koala comes back.

**THE AUDITOR:** The koala comes back. Only the first one hundred tasks involve brand-new classes. After that, the system sees images and classes it has met before. Even a system that loses plasticity may not drop as much, because it partly remembers earlier classes. The thesis calls this a flaw in the experimental design, chosen consciously, because Tiny ImageNet is a well-studied downsampled ImageNet. To reduce remembering, each task runs for two hundred and fifty epochs, which pushes the system to completely override what it knew about the previous task.

*[BEAT]*

**DEV:** Analogy. An exam bank with only a hundred papers. After the hundredth exam, the questions recur.

**LUCÍA:** And a weakening student may still score passably on repeats. Long study on each new paper is meant to wash out memory of the last one.

**DEV:** Where does that break?

**LUCÍA:** A student wants to remember old papers. Here the experimenter deliberately pushes the network to forget them, so the test measures learning, not recall.

**MIRIAM:** Keep that flaw in your head. When the charts start rising late in the run, the thesis itself points back to it: the rise begins once classes repeat.

### Act Two — Two Networks That See

*[MUSIC: "Still Learning" theme, quieter variation]*

**MIRIAM:** The common setup for every experiment in this part of the investigation. Two thousand tasks of Continual ImageNet. Two hundred and fifty epochs per task. Stochastic gradient descent with momentum of 0.9. Cross-entropy loss. Mini-batches of one hundred images.

**PROF. ADEYEMI:** SGD nudges the weights downhill on the error after each small batch. Momentum keeps a running average of recent nudges so updates move more smoothly. Cross-entropy is the standard error measure for classification.

#### Convolution, for Dev

*[MUSIC: explainer bed]*

*[SFX: soft chime]*

**LUCÍA:** Toy Box. Graph paper, and a cardboard square with a window cut in it.

**LUCÍA:** Paper is the image; window is the filter. A convolutional layer slides small filters across the image to detect local patterns: an edge here, a curve there. Each filter produces one output map, called a channel.

**LUCÍA:** Two operations follow each convolutional layer. A ReLU activation, which keeps positive values and sets negatives to zero. And max pooling, which keeps the largest value in each small window.

**LUCÍA:** The output of the last stage is flattened into one long list of numbers and fed to a linear output layer with two units, one per class in the task.

**LUCÍA:** Three such stages, flatten, two outputs. The thesis calls it the simple convolutional network.

**PROF. ADEYEMI:** And initialization: the weight matrices in hidden layers use Kaiming normal initialization, random values scaled to the layer size. Bias terms and the output weight matrix start at zero.

#### Audio walkthrough: Figure 6.2a, layer by layer

**LUCÍA:** Every setting, because I'm me. Three words first. Kernel is the filter's size. Stride is how many pixels the filter jumps each step: larger stride, smaller output. Padding adds a border of zeros so the edges get covered.

**DEV:** Kernel, stride, padding. Size, jump, border.

**LUCÍA:** Input image: 64 by 64 by 3.

**LUCÍA:** Convolutional Layer 1: 32 output channels. Kernel 7 by 7. Stride 4. Padding 3. Then ReLU Activation 1. Then Max Pooling 1: kernel 3 by 3, stride 1, padding 1. Result: 16 by 16 by 32.

**DEV:** So the stride of 4 did the shrinking. Sixty-four down to sixteen.

**LUCÍA:** Convolutional Layer 2: 64 channels. Kernel 5 by 5. Stride 2. Padding 2. ReLU 2. Max Pooling 2: 3 by 3, stride 1, padding 1. Result: 8 by 8 by 64.

**LUCÍA:** Convolutional Layer 3: 128 channels. Kernel 3 by 3. Stride 2. Padding 1. ReLU 3. Max Pooling 3: 3 by 3, stride 1, padding 1. Result: 4 by 4 by 128.

**DEV:** And four times four times one-twenty-eight is two thousand and forty-eight.

**LUCÍA:** The Flatten Operation gives 2,048 numbers. Then the Linear Output Layer: 2 units. In the figure, a bracket groups the three conv stages and labels them the "Convolutional Stack."

**LUCÍA:** Hyperparameters are in Appendix Table A.19.

#### Audio figure: Figure 6.2b

*[MUSIC: tension bed, low]*

**MIRIAM:** Now the first result. Dev.

**DEV:** Figure 6.2b. The x-axis is task number, zero to two thousand, binned in groups of fifty tasks. The y-axis is average test accuracy per task, from 76 percent at the bottom to 88 at the top. Each line is thirty runs averaged, with a shaded band of one standard error. Three lines, three step-sizes. Green is 0.0003. Yellow is 0.001. Orange is 0.003.

**LUCÍA:** Step-size, alpha, sets how big each learning nudge is.

**DEV:** All three lines start high, around 86 percent, read off the chart. And all three drop during the first three hundred tasks.

**MIRIAM:** Every one of them.

**DEV:** Every one. Then they split. Orange, the biggest step-size, 0.003, plunges right off the bottom of the chart. Yellow, 0.001, flattens out near 81 percent. And green, the smallest, 0.0003, does something different: after task three hundred it begins to climb, and it ends near 87 percent.

**THE THESIS:** From the thesis, adapted. After three hundred tasks, once repeated classes appear, both larger step-sizes continued to decrease.

**DEV:** But on the plot, yellow looks flat to me.

*[SFX: ledger bell]*

**THE AUDITOR:** A text-versus-chart mismatch, noted by the book. The text says both larger step-sizes continued to decrease after task three hundred. In the plot, only 0.003 keeps falling; 0.001 flattens near 81 percent. The book reports both, and so do we.

**MIRIAM:** The lesson: smaller nudges slowed the damage. The same pattern we saw in Permuted MNIST.

#### The mixed network

**LUCÍA:** Second network: same stack, then two fully-connected layers. The 2,048 flattened numbers feed Fully-Connected Layer 1, 128 units, then ReLU Activation 4. Then Fully-Connected Layer 2, 128 units, then ReLU Activation 5. Then the two-unit linear output layer. The thesis calls it the mixed convolutional network.

**DEV:** Picture-seeing front end, old-school back end. That's Figure 6.3a.

#### Audio figure: Figure 6.3b

**DEV:** Figure 6.3b. Same axes as 6.2b, but the y-axis is tighter: 83 percent to 89. Thirty runs per line, one-standard-error bands, tasks binned by fifty. Hyperparameters in Table A.19.

**DEV:** And here the story depends on the step-size. With 0.001 and 0.0003, performance falls over the first three hundred tasks, then rises steadily. Again, the rise starts once classes repeat. With 0.003, it's the opposite shape. It first rises, from about 87.5 percent to a peak near 88, then falls steadily to about 84 percent by task two thousand. All read off the chart.

**PROF. ADEYEMI:** The thesis ties both results back to Permuted MNIST, thesis Chapter 3, Figure 3.2a. There, large step-sizes lost performance faster than small ones, but every network lost some plasticity. Continual ImageNet shows the same pattern. Every network declined at first, but those with a smaller step-size suffered less and eventually recovered.

#### A listener writes in

*[SFX: email notification]*

**DEV:** We got a note from a listener, Farah, who runs a computer-vision team at a logistics company. She writes: "If small step-sizes soften the damage, why not just use a tiny step-size and call it a day?"

**PROF. ADEYEMI:** Because the evidence says it softens, not cures. A small step-size mitigates plasticity loss but does not eliminate it: the smallest step-size still dropped over the first three hundred tasks, like every line. So the thesis moves on to look for an actual remedy.

**DEV:** Thanks, Farah.

#### The baselines

**MIRIAM:** Before testing the reinitialization algorithms, the thesis sets up comparison baselines. Two simple methods had maintained plasticity across many fully-connected systems in earlier chapters.

**LUCÍA:** L2 regularization adds a small pull of every weight toward zero, so weights cannot grow without limit. Shrink-and-perturb does the same pull, plus a small injection of random noise into the weights.

**MIRIAM:** And here is a choice I want listeners to notice. The base systems for these tests were chosen deliberately to be fragile.

**DR. PARK:** The simple network at step-size 0.001, the mixed network at 0.003. High early performance, then severe plasticity loss. To test an extinguisher, light a fire.

**LUCÍA:** Three method details. One: networks with L2 regularization or shrink-and-perturb are trained with SGDW with momentum. SGDW is a variant of SGD that keeps the regularization term out of the moving average of the gradient, the momentum. That has been reported to give more stable performance; the citation is Loshchilov and Hutter, 2019.

**LUCÍA:** Two: the L2 factor was tuned to maximize the area under the curve of the average test accuracy plot. That is, the best performance summed over all tasks. Shrink-and-perturb used the same regularization factor; only its noise variance was tuned. Three: tuning followed the usual two stages. A wide search with a single run, then a narrow search with five runs per hyperparameter combination.

#### Audio figure: Figure 6.4

**DEV:** Figure 6.4. Two panels. Both plot average test accuracy per task, thirty runs, one-standard-error bands, against task number in bins of fifty. Panel a, the simple network, spans 80 to 88 percent. Panel b, the mixed network, spans 84 to 91. Three lines each: base system in black, L2 regularization in pink, shrink-and-perturb in orange. Hyperparameters in Table A.19.

**DEV:** Panel a, simple network. Black, the base system, falls from about 86 percent to about 81. Pink and orange hold near 86. But look closely: both still dip slightly below where they started.

**MIRIAM:** Mitigated, not removed.

**DEV:** Panel b, mixed network. Black slides from about 87.5 to about 84. And pink, L2 regularization, doesn't just hold the line. It climbs steadily, from about 88 percent to about 91.

**LUCÍA:** And in both panels, shrink-and-perturb performs much like L2 regularization.

**MIRIAM:** Same baseline, two architectures, two verdicts.

**THE THESIS:** From the thesis, adapted. Convolutional networks are susceptible to plasticity loss on Continual ImageNet. A small step-size mitigates it but does not eliminate it. L2 regularization and shrink-and-perturb mitigate it in the simple network and fully prevent it in the mixed network.

*[SFX: rising tone that thins and flattens]*

**NORA:** I thought pictures would be different. Same feeling. Every Monday a new pair, and every Monday it takes a little longer to see.

**MIRIAM:** The skeptics said real systems see pictures. The answer so far: they see pictures, and they still lose the ability to learn.

### Act Three — The Runs That Blew Up

*[MUSIC: "Still Learning" theme — low cello pulse]*

**MIRIAM:** Time stamp, twenty-four minutes. The investigation now turns to the remedy. Can selective reinitialization, the cure that worked on the toy networks, prevent plasticity loss in networks that see?

**MIRIAM:** Short answer: yes, all three prevent it. Long answer: seven runs that crashed, and an autopsy.

#### What is a "unit" in a picture network?

*[MUSIC: explainer bed]*

**DEV:** In the toy networks a unit was one neuron, one number. What's a unit in a convolutional layer?

**LUCÍA:** Both families of selective reinitialization carry over, with one adjustment. Weight reinitialization is straightforward. It works on individual weights, so it doesn't care how the network is wired. Unit reinitialization has to decide what a "unit" is. The thesis takes the convolutional channel as the unit. That's the picture in thesis Figure 4.8b, which we walked through in Episode Six.

**UNIT 47:** I used to be a neuron. Now I'm a whole map. Bigger. Not more important.

**DEV:** But a channel is a grid of numbers. Utility wants one number.

**LUCÍA:** So there's one extra step. The average activation of a channel is averaged over the samples in the mini-batch and over the channel's width and height. That reduces the channel to one number, which feeds the same utility measures from thesis Chapter 4.

**DEV:** And where do you read the channel from? After ReLU or after pooling?

**LUCÍA:** This chapter uses the max-pooling output. Using the ReLU outputs gave similar performance during hyperparameter tuning, so it isn't a fragile choice.

**CAPT. AL-HARBI:** Analogy, labelled. Auditing a department rather than an individual. You summarize the whole department's output into one score, then decide whether to restructure it. Where it breaks: a department holds people with different jobs; a channel is one filter doing one job everywhere in the image.

#### Experiment 1: the simple network

**MIRIAM:** Experiment one. The base system is the simple network with step-size 0.001. The fragile one.

**LUCÍA:** Three algorithms, and what was tuned for each. ReDo: activation utility, hemi-reinitialization; tuned its reinitialization frequency and its threshold. Continual backprop: contribution utility, hemi-reinitialization; tuned its maturity threshold and replacement rate. Selective weight reinitialization: first-order utility, threshold pruning, resample reinitialization; tuned its reinitialization frequency and reinitialization factor.

**LUCÍA:** Hemi-reinitialization: a reset unit gets fresh random input weights and zero output weights, so it does not disturb the network's output at first. First-order utility: an estimate of how much the loss would change if the weight were removed. Threshold pruning: reset every weight whose utility is at or below the reinitialization factor, rho, times the average utility of its matrix.

**DEV:** Underline "average."

**LUCÍA:** Resample reinitialization: give each reset weight a new value drawn from the original initialization distribution. And maturity threshold and replacement rate: continual backprop protects young units until they reach a set age, then resets a fixed fraction of mature units.

#### Audio figure: Figure 6.5a

**DEV:** Figure 6.5. Two panels. Both plot average test accuracy per task, y-axis 80 to 92 percent, thirty runs, one-standard-error bands, against task number zero to two thousand in bins of fifty. Five lines. Continual backprop, yellow. ReDo, green. Selective weight reinitialization, blue. L2 regularization, pink. Base system, black. Hyperparameters in Table A.20.

**DEV:** Panel a, the simple network. Every selective reinitialization algorithm prevents the base system's drop. All three maintain plasticity. Yellow, continual backprop, is highest, near 90 percent. Green, ReDo, sits just below it, and the gap between them narrows as tasks accumulate. Blue, SWR, maintains plasticity but sits lower, rising from about 87 to about 89. All three beat pink, L2 regularization at about 86, and black, the base system at about 81. Read off the chart.

**PROF. ADEYEMI:** A reversal. In the fully-connected results of the previous chapter, Episode Seven, selective weight reinitialization often beat unit reinitialization. Here, it comes third. The thesis offers a hypothesis: SWR may have its advantage when the network includes fully-connected layers.

#### Experiment 2: the mixed network

**MIRIAM:** Experiment two. Base system: the mixed network with step-size 0.003. L2 regularization added as a baseline.

**DEV:** Panel b. And the results differ sharply. Yellow, continual backprop, still maintains plasticity and performs well, about 90 to 91 percent. But pink, L2 regularization, now comes close to it.

**DEV:** Green, ReDo, also maintains plasticity, closer still to continual backprop. But in the last few tasks, it becomes unstable. Its line drops and its shaded band widens.

**DEV:** And blue, SWR. It maintains plasticity at first, tracking near 89 percent. Then, from roughly task eight hundred, its performance becomes increasingly unstable. It falls as low as about 82 to 83 percent, with a very wide band.

**PROF. ADEYEMI:** The thesis does not return to its hypothesis explicitly. But in the mixed network, SWR did worse, not better. And the reason was instability.

#### The incident investigation

*[MUSIC: low drone, a slow clock tick]*

**MIRIAM:** A very wide band, suddenly, means some runs have gone somewhere the others haven't. We asked Dr. Priya Venkataraman, who runs large training jobs in production, to treat this like an incident.

*[TAPE: Dr. Priya Venkataraman, recorded in a small conference room; a whiteboard marker squeaks]*

**DR. VENKATARAMAN:** Post-incident review: impact, timeline, root cause, remediation.

**DR. VENKATARAMAN:** Impact. In the mixed network, six runs of selective weight reinitialization and one run of ReDo diverged. Divergence means the optimization process blew up. The loss kept increasing until the numbers overflowed: they became too large for the computer to represent.

**DR. VENKATARAMAN:** That's what blew the shaded bands wide open in Figure 6.5b.

**DR. VENKATARAMAN:** Timeline. The thesis gives us the flight recorder. That's Figure 6.6.

#### Audio figure: Figure 6.6, read as a flight recorder

**DR. VENKATARAMAN:** Two panels. Each line is one run that eventually diverged.

**DR. VENKATARAMAN:** Panel a. The x-axis is the reinitialization step, counted backwards from the last one: from minus ten up to a point labelled "Last Reinit Step." The y-axis is the percent of weights or units reinitialized at that step, from zero to ninety percent. Light-blue lines are SWR's diverging runs. The single green line is ReDo's diverging run.

**DR. VENKATARAMAN:** What the recorder shows, read off the chart. The SWR runs reinitialize roughly ten to thirty percent of weights per step for most of their history. That's normal operations for that algorithm. Then, in the last step or two, they jump to about fifty to eighty-five percent.

**DR. VENKATARAMAN:** ReDo's run is different. It resets almost nothing until two steps before the end. Then it rises to about twenty percent at the next-to-last step, then jumps to about sixty.

**DR. VENKATARAMAN:** Panel b. The x-axis is the epoch relative to the last reinitialization step, from minus three to plus three. The y-axis is the average train loss per epoch, from zero to one hundred. Same colour coding. Before the last reinitialization step, the loss sits near zero. Healthy. Around and after that step, it climbs steeply, shooting past one hundred within a few epochs.

**MIRIAM:** And the common thread.

**DR. VENKATARAMAN:** In every diverging run, divergence was preceded by a surge in reinitialized weights or units. Every one. The algorithms suddenly reinitialized a large portion of the network. That big reset caused a large change in the loss, and the loss then kept increasing until it diverged.

**CAPT. AL-HARBI:** In my world, a maintenance-induced failure. The aircraft was flying fine; the maintenance action was the event.

*[SFX: rising whine, crackle, silence]*

**NORA:** Last good epoch, loss near zero. Then: most of you is being replaced. Then I didn't know what a koala was.

#### The chain of events

**MIRIAM:** The book draws this as a chain, top to bottom. Dev.

**DEV:** Four boxes. One: an outlier distorts the average. Two: too much is reset at once. Three: the loss spikes and keeps rising. Four: the run diverges. And off to the side, three green boxes: the three remedies the thesis discusses. We'll get to those.

#### Root cause: threshold pruning

**DR. VENKATARAMAN:** Root cause. ReDo and SWR both used threshold pruning. Threshold pruning removes every weight below a threshold set from the average utility of the weights in the matrix. And an average is fragile. One extreme outlier can drag it far up. If it does, almost everything falls below the threshold. In the extreme, all but one unit or weight is pruned. That is exactly the surge in Figure 6.6a.

**MIRIAM:** Lucía has a demonstration.

*[SFX: soft chime]*

**LUCÍA:** Toy Box. I have ten poker chips on the table. Each chip has a number written on it: its utility. Nine chips say 1. One chip says 91.

**LUCÍA:** Average utility. Nine ones is nine. Plus ninety-one is one hundred. Divided by ten chips.

**DEV:** Ten.

**LUCÍA:** Average is ten. Reinitialization factor, rho, is 0.5. So the cut-off is rho times the average: 0.5 times 10 is 5. Any chip at or below 5 gets reset.

*[SFX: chips swept off a table, one by one, nine times]*

**DEV:** Nine of them. Nine out of ten, reset at once.

**LUCÍA:** Nine out of ten. Now, same table, but I take the 91 off first. Nine chips, all ones. Average: 1. Cut-off: 0.5. How many are at or below 0.5?

**DEV:** None. Nothing's reset.

**LUCÍA:** One outlier changed the outcome from "reset nothing" to "reset ninety percent." And notice who survives the purge. The outlier. The one chip that caused the problem is the one that stays.

#### Restructuring with a cap

**DR. VENKATARAMAN:** Here's the framing I use with managers, and I'll label it as an analogy. Restructuring with a cap. Suppose a company has a rule: every quarter, replace everyone performing below half the department average. Sounds reasonable. Now one star salesperson lands a freak deal and their number is ten times everyone else's. The department average jumps, and half that average is now above everyone else's number. The rule, applied mechanically, guts the whole department overnight. And it keeps the star.

**DEV:** And the remedy?

**DR. VENKATARAMAN:** Three remedies, matching the three green boxes. Either cap the number replaced per round: that's proportional pruning. Or use a fairer benchmark: the median. Or stop stars from inflating in the first place: that's L2 regularization.

**CAPT. AL-HARBI:** Where it breaks: a company can rehire and customers barely notice for a while. A network's output depends on those weights right now, so the loss spikes at once.

#### Fix 1: proportional pruning

**MIRIAM:** Remedy one. There are many ways to prevent the surge. The simplest is proportional pruning.

**LUCÍA:** Proportional pruning resets a fixed proportion of weights each time, regardless of how utilities are distributed. Outliers can't change how many get reset. For unit reinitialization, the equivalent is continual backprop, which also resets a fixed fraction.

**DEV:** So continual backprop had a cap built in.

**LUCÍA:** Proportional by design. The book's claim: threshold pruning is the common factor in the instability.

**MIRIAM:** The thesis reran the mixed network with two SWR settings that use proportional pruning.

**LUCÍA:** Setting one, "SWR: random, proportional, mean." Random utility, so weights are chosen at random. Proportional pruning. And mean reinitialization: reset weights are set to the mean of the initialization distribution, usually zero. Setting two, "SWR: first-order, proportional, resample." First-order utility, proportional pruning, resample reinitialization.

#### Audio figure: Figure 6.7a

**DEV:** Figure 6.7. Two panels, both on the mixed convolutional network. Both plot average test accuracy per task, y-axis 82 to 92 percent, thirty independent runs, shaded standard error, against task number zero to two thousand in bins of fifty. Hyperparameters in Table A.21.

**DEV:** Panel a's lines. Continual backprop, yellow. L2 regularization, pink. SWR random-proportional-mean, light blue. Base system, black. SWR first-order-proportional-resample, grey.

**DEV:** Light blue, the random one, maintains plasticity with no diverging runs, climbing to about 90 percent. But it doesn't match yellow or pink, which are both around 91. And grey, the first-order proportional setting, does no better than the base system. Both slide to about 84 percent.

**LUCÍA:** The smarter utility did worse than random, here. And during the hyperparameter search, the first-order setting also diverged at large reinitialization factors. That limited it to small reinitialization amounts.

*[SFX: ledger bell]*

**THE AUDITOR:** A caveat for the record, so nobody over-reads it. The thesis notes that the first-order setting was limited to small reinitialization amounts because larger ones diverged during the search. It does not draw a causal link between that limit and the setting's weak result. Neither should you.

#### Fix 2: the median (proposed)

**MIRIAM:** Remedy two is a proposal, not a test.

**LUCÍA:** Proportional pruning is simple, but it gives up threshold pruning, which often gave the best performance in earlier chapters. So it's worth finding a fix that keeps threshold pruning. A simple option: compute the threshold from the median utility instead of the mean. The median is robust to outliers.

**LUCÍA:** Nine ones and a ninety-one. Line them up. The middle is a 1. Median: 1. Cut-off: 0.5. Nothing is reset. The ninety-one can shout as loud as it likes; the median doesn't move.

**MIRIAM:** And the thesis's verdict?

**THE THESIS:** From the thesis, adapted. Using the median is promising. A comprehensive study is left for future work.

#### Fix 3: L2 regularization

**MIRIAM:** Remedy three, the one the thesis did test: combine reinitialization with L2 regularization, which keeps weights from growing too large and so prevents learning instabilities.

**PROF. ADEYEMI:** Earlier chapters suggested that combining approaches often beats any single one. This test also shows how the two complement each other. The setup: L2 regularization combined with ReDo, activation utility; with continual backprop, contribution utility; and with SWR using first-order utility, threshold pruning and resample reinitialization, labelled "SWR: first-order, threshold, resample." The regularization factor is the same as in the L2 baseline. Each algorithm's own hyperparameters are re-tuned.

**DEV:** So SWR keeps threshold pruning, but gets a seat belt.

#### Audio figure: Figure 6.7b

**DEV:** Panel b's lines. Continual backprop plus L2, yellow. ReDo plus L2, green. SWR first-order-threshold-resample plus L2, blue. L2 regularization alone, pink. Base system, black.

**DEV:** And everything goes up. Combining L2 with selective reinitialization improves performance. For continual backprop, the gain is modest. For ReDo and SWR, the gains are considerable. None of their runs diverged. And their performance rose close to continual backprop's, near 91 percent.

**LUCÍA:** Two more points from the figure. L2 regularization stabilized learning, and it also narrowed the gap between the reinitialization algorithms. And every combination beat L2 regularization alone.

**DR. VENKATARAMAN:** Remediation confirmed. And note the thesis's stated reason: L2 keeps weights from growing too large, and so prevents learning instabilities. Any finer mechanism is ours to wonder about, not the thesis's claim.

**THE THESIS:** From the thesis, adapted. Selective reinitialization maintained plasticity in both convolutional architectures, including the mixed one that combines convolutional and fully-connected layers, and it beat L2 regularization and shrink-and-perturb. It must be applied carefully, because threshold pruning can cause divergence. The most effective approach overall was L2 regularization combined with selective reinitialization, which suggests combined approaches beat each approach alone.

### Act Four — Warning Lights, Old Sightings, and the Practical Case

*[MUSIC: "Still Learning" theme, slow piano]*

**MIRIAM:** Time stamp, thirty-nine minutes. Do the old warning signs show up in networks that see? And where does this sit in the record?

#### The four warning lights

**CAPT. AL-HARBI:** Correlates are measurable changes that accompany plasticity loss. We met them in Episode Four. Not proven causes. Diagnostic tools. Warning lights on an instrument panel: the light tells you something is wrong, not what broke.

**LUCÍA:** The four checked here. One: frozen units accumulate. A ReLU unit is frozen when it outputs zero for every input, so it stops learning. Two: weight magnitude increases. Three: gradient magnitude decreases. The gradient is the signal that tells each weight how to change; when it shrinks, learning slows. Four: the stable rank of the representation decreases. Stable rank roughly counts how many independent directions the network's internal features use. Lower means less diverse features.

**DR. PARK:** And measurement details, because they matter. Average gradient magnitude: on every mini-batch during learning. Average weight magnitude, percent of frozen units, and stable rank: before each new task. For stable rank and frozen units, activations come from the test set of the new task. And for convolutional layers, a unit's output is its channel averaged over the channel dimensions, the same reduction used for utilities in the previous act.

#### Audio figure: Figure 6.8, the simple network

**DEV:** Figure 6.8. Five panels, each averaging thirty runs, x-axis task number in bins of fifty. Lines: base system black, L2 pink, SWR blue, ReDo green, continual backprop yellow.

**DEV:** Panel a: average test accuracy per task, 80 to 92 percent, the same as Figure 6.5a. Panel b: percent of frozen units, measured on the test set at the start of each task, zero to 35 percent. Panel c: average weight magnitude before each task, about 0.01 to 0.09. Panel d: average gradient magnitude on each mini-batch, 0.0004 to 0.0018. Panel e: stable rank of the representation layer, measured on the test set at the start of each task, from 40 to 90; the maximum possible is 128.

**DEV:** Now the black line, all read off the chart. Frozen units rise sharply to about 30 percent. Weight magnitude climbs steadily to about 0.09. Gradient magnitude falls. Stable rank collapses from about 87 to about 42, then recovers slightly to about 48.

**MIRIAM:** All four lights on.

**PROF. ADEYEMI:** And it matches the fully-connected results, thesis Figures 3.4 and 3.5.

**LUCÍA:** Every method prevents at least one of these pathologies. L2 regularization, for example, keeps weights small, but still lets frozen units climb toward 30 percent and stable rank fall to about 51. And continual backprop, the best performer, prevents all of them: near-zero frozen units, flat weight magnitude near 0.04, the highest gradient magnitude, and stable rank near 88.

**UNIT 88:** Under continual backprop, nobody in my layer went dark. A few of us got recycled.

#### Audio figure: Figure 6.9, the mixed network

**DEV:** Figure 6.9. Seven panels, thirty runs each, task number in bins of fifty. Lines: base system black, SWR first-order-proportional-resample grey, L2 pink, SWR random-proportional-mean light blue, continual backprop yellow. Panel a: accuracy, 82 to 92 percent. Panel b: average weight magnitude before each task. Panel c: average gradient magnitude on each mini-batch. Panel d: stable rank of the representation layer, maximum 128. Panel e: percent of frozen units in the whole network. Panel f: frozen units in the convolutional layers only. Panel g: frozen units in the fully-connected layers only.

**DEV:** Black, the base system, worsens on all four. Weight magnitude rises from about 0.035 to over 0.06. Gradient magnitude falls. Stable rank drops from about 88 to about 76. Frozen units rise to about 14 percent.

**LUCÍA:** The plasticity-preserving methods each mitigate one or more. Continual backprop again prevents all of them: frozen units near zero, flat weights near 0.029, the highest gradient, stable rank near 84. And again it performs best.

**MIRIAM:** And panels f and g.

**DEV:** This is the twist. Frozen units behave differently by layer type. In the convolutional layers, panel f, the base system's frozen units climb steadily, from about 1 percent to about 19. In the fully-connected layers, panel g, they rise early to about 14 percent, then decline steadily to about 9.

**DR. LINDQVIST:** Different tissue, different aging. The thesis puts it carefully: this may mean plasticity loss happens differently in different layer types of one network. "May."

**THE THESIS:** From the thesis, adapted. Plasticity loss in convolutional networks comes with the same qualitative changes as in fully-connected networks. Preventing the correlates was associated with better performance, though the correlates are not the root cause. Continual backprop, with few frozen units, high gradient magnitude, high stable rank and non-increasing weight magnitude, performed best in both architectures.

#### The record

*[AMBIENCE: archive room, page turns]*

**THE ARCHIVIST:** The record, then. The first clear demonstrations of plasticity loss in the literature came from the author and co-authors in a pre-print of their *Nature* paper: Dohare and colleagues, 2023. This chapter uses the same experimental design and a similar network, and strengthens those results by adding a second architecture and a different downsampled ImageNet. Together, they show that a variety of convolutional networks lose plasticity in two different versions of Continual ImageNet.

**DR. MARCHETTI:** And before that, the sightings. As in Episode Five, people saw it without naming it.

**THE ARCHIVIST:** Chaudhry and colleagues, 2018, the earliest: convolutional networks lost their ability to learn new classes in a class-incremental learning problem, where classes are added over time. Ash and Adams, 2020: convolutional networks lost their ability to learn when first trained on a small portion of a dataset and then on the full dataset. In deep reinforcement learning, systems that learn by trial and reward, DQN agents, which use convolutional networks similar to this chapter's, lost their ability to learn from new observations: Kumar and colleagues, 2021; Nikishin and colleagues, 2022; Lyle and colleagues, 2022; Sokar and colleagues, 2023.

**DR. MARCHETTI:** All saw deterioration on non-stationary data. None connected it as one underlying phenomenon.

**THE ARCHIVIST:** Once the phenomenon was recognized, focused studies followed. Double DQN and Rainbow agents, both convolutional, were shown to lose plasticity over time: Nikishin and colleagues, 2023; Abbas and colleagues, 2023. Lyle and colleagues, 2023, and Kumar and colleagues, 2024, gave extensive evaluations of methods to prevent plasticity loss in convolutional systems, in reinforcement learning and in continual supervised learning respectively. And convolutional systems and more complex architectures are now standard for comparing such methods: Lewandowski and colleagues, 2025; Lee and colleagues, 2024; Farias and Jozefiak, 2025.

#### The verdict

*[MUSIC: low cello]*

**MIRIAM:** The thesis's conclusions. The phenomenon extends beyond fully-connected networks: a system able to learn forever should show a flat or rising trend, so the decline is evidence of slowly lost ability to learn. Baselines help but are inconsistent. Continual backprop reliably prevented the loss and consistently beat the other methods. Threshold pruning is the common factor in the instability; proportional pruning prevented it, though not every proportional setting kept plasticity. Reinitialization and regularization are complementary: L2 removed the instabilities, improved every approach, and made the choice of method matter less. And the correlates carry over, with nuance.

#### Why it matters: continuous pre-training

**DR. VENKATARAMAN:** This is the part I'd put in front of a budget committee. The problem looks contrived, but it mirrors a common situation. Picture a network already trained on millions of examples, performing reasonably well. A new, related task arrives. It's tempting to reuse the existing network, because it may hold useful knowledge. These results suggest that, with standard methods, its performance may suffer, forcing a retrain from random initialization. Selective reinitialization may instead allow continuous pre-training and fine-tuning, saving considerable time and resources.

#### Audio figure: Figure 6.10

**DEV:** Figure 6.10, mixed network. The x-axis is the epoch within a task, zero to 250. The y-axis is test accuracy, 60 to 95 percent, thirty runs, shaded uncertainty. Four lines per panel: Task 1 dark orange, Task 10 yellow, Task 100 green, Task 1,000 blue. Panel a is continual backprop combined with L2. Panel b is the base system.

**DEV:** Panel a: each later task ends higher. Task 1 settles near 86 percent, Task 10 near 89, Task 100 near 91, Task 1,000 near 92. And later tasks also converge faster within the task. Panel b: the base system improves up to Task 100, about 90 percent, then declines. Task 1,000 ends near 88. Read off the chart.

**THE THESIS:** From the thesis, adapted. Two gains follow. Speed: not having to train from random initialization may speed up training, because performance converges faster. Accumulated knowledge: learning across many tasks may let a system reach higher performance than any fresh start. Both are extrapolations from Continual ImageNet; still, such gains could significantly enhance deep learning systems.

**CAPT. AL-HARBI:** Analogy, labelled. An experienced crew that gets better and faster with each new project, versus one that grows stale and must be replaced. Selective reinitialization is rotating a few roles so the whole team stays sharp. Where it breaks: the network rotates by a utility score, and as we heard today, one outlier can fool that score.

### Three Things to Remember

*[MUSIC: explainer bed]*

**LUCÍA:** One. Convolutional networks lose plasticity on Continual ImageNet: two thousand two-way tasks, 250 epochs each, thirty runs per curve. A smaller step-size softens it but doesn't prevent it. L2 and shrink-and-perturb mitigate it in the simple network and prevent it in the mixed one, but not consistently.

**DEV:** Two. Continual backprop is the most reliable fix in both architectures and prevents all four warning lights: frozen units, rising weights, falling gradients, falling stable rank.

**MIRIAM:** Three. Threshold pruning can reset most of a network at once when one utility is an outlier. Six SWR runs and one ReDo run diverged that way in the mixed network. Proportional pruning or added L2 stops it, and L2 plus selective reinitialization gave the best results and made the choice of algorithm matter less.

### Check Your Understanding

*[SFX: soft chime]*

**LUCÍA:** Five questions. Pause after each.

**LUCÍA:** One. Why does the thesis run 250 epochs per task on Tiny ImageNet?

*[BEAT]*

**DEV:** Only 200 classes, so after 100 tasks the classes repeat. Long training per task pushes the network to overwrite the previous task, which reduces help from remembering.

**LUCÍA:** Two. In a convolutional layer, what counts as a "unit" for ReDo and continual backprop, and how is its activity reduced to one number?

*[BEAT]*

**DEV:** The channel. Its activation is averaged over the mini-batch samples and over its width and height.

**LUCÍA:** Three. Why can threshold pruning suddenly reset almost the whole network, and why is proportional pruning immune?

*[BEAT]*

**DEV:** The threshold is a multiple of the average utility, and one outlier can inflate it so nearly everything falls below. Proportional pruning resets a fixed share whatever the utilities look like. Nine ones and a ninety-one.

**LUCÍA:** Four. In the mixed network, how did frozen units differ by layer type?

*[BEAT]*

**DEV:** Convolutional layers: rose steadily, about 1 to 19 percent. Fully-connected: rose early to about 14, then declined to about 9.

**LUCÍA:** Five. What two gains does Figure 6.10 suggest, and how firmly does the thesis claim them?

*[BEAT]*

**DEV:** Faster convergence on new tasks, and higher performance from accumulated knowledge. Both labelled extrapolations from Continual ImageNet.

### Credits and Next Time

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano]*

**MIRIAM:** The networks saw pictures, and still lost the ability to learn. The cure still worked, but it has a failure mode: a rule built on an average can be undone by a single number.

**MIRIAM:** Still, these networks are modest by today's standards. Next time, on Episode Nine, "The Frontier": the thesis asks whether plasticity loss matters in the systems that run the world now, with the normalization, architectures and optimizers of state-of-the-art deep learning.

**MIRIAM:** STILL LEARNING is adapted from the book *Keeping Neural Networks Learning*. The thesis is © Juan Fernando Hernandez Garcia, 2026, licensed CC BY 4.0, adapted here with credit. Code at github.com/JFernando4/plasticity-via-reinit. All experts and actors in this series are fictional. Graham Asante voiced THE THESIS, Nell Varga voiced NORA, Ruth Kellerman was THE ARCHIVIST, Samir Haddad was THE AUDITOR. I'm Miriam Okafor.

*[MUSIC: theme resolves]*

### Show Notes

**Thesis sections covered:** Chapter 6 opening, §6.1 (Continual ImageNet, Tiny ImageNet), §6.2 (loss of plasticity, baselines), §6.3 (selective reinitialization, divergence, fixes), §6.4 (correlates), §6.5 (prior demonstrations), §6.6 (discussion and conclusion); pp. 93–109. Hyperparameters in Appendix Tables A.19–A.21. Book Chapter 19.

**Equations.** Thesis Chapter 6 has no numbered equations, tables or algorithms. The episode recalls one equation from thesis Chapter 3, which the average test accuracy mirrors.

Equation 3.3 — average empirical loss:

```latex
\hat{\mathcal{L}}_k(\boldsymbol{\theta}_{T_k}) \doteq \frac{1}{\tau_k} \sum_{j=0}^{\tau_k - 1} \frac{1}{m} \sum_{i=1}^{m} \ell\left( f_{\boldsymbol{\theta}_{T_k + j}}(\mathbf{x}_{T_k + j, i}), \mathbf{y}_{T_k + j, i} \right)
```

Threshold pruning rule as spoken (descriptive, not a numbered thesis equation): reset a weight when its utility is at or below ρ times the average utility of its matrix.

**Audio figures.**

| Figure | One line |
| --- | --- |
| 6.1 | Continual ImageNet: alligator vs guitar, game controller vs fish, bison vs bow tie, harp vs koala, for thousands of pairs. |
| 6.2a | Simple network: three conv–ReLU–max-pool stages take 64×64×3 to 4×4×128, flattened to 2,048, then a 2-unit output. |
| 6.2b | Step-sizes 0.0003/0.001/0.003: all drop over the first 300 tasks; 0.003 plunges, 0.001 flattens near 81%, 0.0003 climbs to near 87%. |
| 6.3a | Mixed network: same stack, then two 128-unit fully-connected ReLU layers, then a 2-unit output. |
| 6.3b | 0.001 and 0.0003 fall then rise after task 300; 0.003 peaks near 88% then falls to about 84%. |
| 6.4 | L2 and shrink-and-perturb hold near 86% (simple) and lift the mixed network to about 91%. |
| 6.5 | Simple: continual backprop near 90%, ReDo just below, SWR 87–89%. Mixed: ReDo unstable late, SWR unstable from about task 800. |
| 6.6 | Diverging runs: resets surge to about 50–85% (SWR) or 60% (ReDo); train loss then passes 100 within a few epochs. |
| Chain diagram | Outlier, mass reset, loss spike, divergence; three remedies. |
| 6.7a | SWR random-proportional-mean reaches about 90% with no divergence; first-order-proportional-resample matches the base system near 84%. |
| 6.7b | Reinitialization plus L2: no divergence; all near 91%; every combination beats L2 alone. |
| 6.8 | Simple-network correlates: base frozen units about 30%, weights about 0.09, stable rank 87 to 42 then 48; continual backprop prevents all four. |
| 6.9 | Mixed-network correlates: base weights to over 0.06, stable rank 88 to 76, frozen 14%; conv frozen 1% to 19%, fully-connected 14% then 9%. |
| 6.10 | Within-task curves, tasks 1/10/100/1,000: continual backprop + L2 ends near 86/89/91/92%; base system peaks near 90% at task 100, ends near 88%. |

**Key settings.** 2,000 tasks; 250 epochs per task; SGD with momentum 0.9 (SGDW with momentum for L2 and shrink-and-perturb); cross-entropy loss; mini-batch 100; 30 runs per line; one-standard-error bands; bins of 50 tasks. Tiny ImageNet: 200 classes, 500 training and 50 test images per class, 64×64×3, per-channel normalization from the full training set. Fragile base systems: simple at 0.001, mixed at 0.003. Diverged runs: 6 SWR, 1 ReDo.

**Auditor notes.** (1) Classes repeat after 100 tasks, a conscious design flaw, mitigated by 250 epochs per task. (2) Figure 6.2b: thesis text says both larger step-sizes kept decreasing; on the plot only 0.003 falls, while 0.001 flattens near 81%. (3) The thesis notes the first-order proportional setting was limited to small reinitialization amounts but draws no causal link to its weak result.
