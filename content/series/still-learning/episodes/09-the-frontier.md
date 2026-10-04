---
number: 9
title: The Frontier
slug: 09-the-frontier
summary: 'The finale. The cure meets the machines people actually build: a residual network it fully rescues and a vision transformer it only partly saves. Then the verdict on the whole investigation, and the questions still open.'
coverage: 'Covers book chapters 20–21 (thesis Chapter 7 opening and §7.1–§7.7, pp. 110–128, and thesis Chapter 8 "Conclusion", pp. 129–131). The series finale: Nora grows up into a residual network and a vision transformer, the cure meets the machines people actually build, and Miriam delivers the verdict.'
interests:
- ai
- science
estimatedMinutes: 55
status: in-production
---

### Cold Open

*[TIMECODE: 00:00]*

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano. Held under, very quiet.]*

**MIRIAM:** For eight episodes we have followed one network. We watched her learn her first task with ease, then slow, task by task, until new lessons barely registered. We found the suspects: units that went silent, weights that grew too large, a representation that narrowed. And we found a cure: give a small, carefully chosen part of the network a fresh start, and keep doing it for as long as the network lives.

*[BEAT]*

**MIRIAM:** But one objection has hung over this investigation. The networks in the evidence room were small. Real systems carry regularization, normalization, learning-rate schedules, data augmentation. Perhaps those modern tools already solve the problem.

*[SFX: rising tone that thins and flattens — deeper, heavier than before]*

**NORA:** I've been away. I'm bigger now. Eighteen layers. Skip connections. Batch normalization. People say I'm state of the art. I feel very sure of myself.

**THE THESIS:** From the thesis, adapted. Even state-of-the-art image networks, trained with modern techniques, lose plasticity. Selective reinitialization fully prevents it in a residual network. In a vision transformer it only reduces it.

**MIRIAM:** Fully in one. Partly in the other. Tonight the cure meets its limit. And at the end, after nine episodes, we read the verdict.

*[MUSIC: theme swells, then cuts to title sting]*

**MIRIAM:** From the producers of STILL LEARNING, this is Episode Nine: "The Frontier."

*[MUSIC: sting out]*

### Act One — The Growing Exam

*[TIMECODE: 02:00]*

*[MUSIC: explainer bed — plucked bass, light percussion]*

**DEV:** Lucía, in airline operations we had a saying: the simulator is not the airplane. Permuted MNIST, Continual ImageNet, that's the simulator. Where's the airplane?

**LUCÍA:** Book Chapter 20, thesis Chapter 7, pages 110 to 128. Thesis Chapter 6, our last episode, showed that convolutional networks lose plasticity and that selective reinitialization still works. But those networks lacked many advances used in state-of-the-art systems. So the crucial question: is plasticity loss relevant in contemporary deep learning?

**DEV:** And the plan?

**LUCÍA:** Three moves. One: two complex architectures, residual networks, specifically ResNet-18, and vision transformers. Two: a class-incremental image classification problem built on CIFAR-100, where, despite regularization and other standard modern techniques, both systems lose plasticity. Three: evaluate continual backpropagation, ReDo and selective weight reinitialization. All three maintain plasticity in the residual network; they are less effective in vision transformers. The thesis still concludes selective reinitialization is viable for modern architectures.

**MIRIAM:** For the record, this chapter includes the author's contributions to two papers: one in *Nature*, Dohare and colleagues, 2024, and one at the Conference on Lifelong Learning Agents, Hernandez-Garcia and colleagues, 2025.

*[SFX: soft chime]*

**LUCÍA:** Toy Box. Today's prop is a deck of picture cards. CIFAR-100, from Krizhevsky and Hinton, 2009. One hundred classes. Each class has 500 training images and 100 test images. Each image is 32 pixels wide, 32 tall, with three colour channels, red, green and blue: 32 by 32 by 3.

**DEV:** That's a postage stamp.

**LUCÍA:** Now the exam, Incremental CIFAR-100. I deal you five classes.

*[SFX: five cards dealt onto felt]*

**LUCÍA:** Train, frog, shark, tree, dog. You study them for several epochs, an epoch being one full pass through the training set. Then I add five more: cat, plane, TV, elephant, bicycle. Your training set now holds all ten classes, and you must sort all ten. Five at a time, until all 100 classes are in play. Each increment of five classes is a task. So: twenty tasks.

*[SFX: ledger bell]*

**THE AUDITOR:** A word on the record. Here the thesis text says "20 classes in total." From the setup, one hundred classes added five at a time, it means twenty tasks.

*[SFX: ledger closes]*

**LUCÍA:** Audio figure: Figure 7.1, the description of the problem. Three panels. Task 1: a stack of five picture cards, train, frog, shark, tree, dog, captioned "pictures from five classes have to be distinguished." Task 2: those plus a cat, a plane, a TV, an elephant and a bicycle, in a deeper stack: "five more classes are added, and pictures from all ten have to be distinguished." A row of dots. Then Task 20, a very deep stack: "the process continues until finally all 100 classes have to be distinguished." What it shows: the classification problem grows steadily harder.

**CAPT. AL-HARBI:** *Analogy.* A customs officer who starts by recognizing five prohibited goods, then ten, then fifteen, up to a hundred, each new list including all the old items. Where it breaks: the officer can consult a printed list. The network has only its weights.

**DEV:** How do we score it?

**LUCÍA:** Top test accuracy: the highest accuracy on the current task's test set reached during that task. That mirrors how state-of-the-art systems report results.

**DEV:** Dumb question. If accuracy goes down as classes are added, isn't that plasticity loss? Case closed?

**LUCÍA:** That's the trap. Each task is harder than the last, so accuracy would fall even for a system that keeps its plasticity. Raw accuracy can't reveal plasticity loss. So the thesis compares two lanes. The incremental system is trained task after task, carrying its weights forward. The fresh system is a new network, randomly initialized, trained only on the current task. For task 2, both train on the same ten classes; one has been learning since task 1, the other starts from scratch.

**LUCÍA:** The measure of plasticity: incremental system's performance minus fresh system's performance. Audio figure: two running lanes ending on the same classes for task k. Subtract. Above zero, the long-trained network still learns at least as well as a fresh one. Below zero, it has lost plasticity.

**CAPT. AL-HARBI:** *Analogy.* Judge a veteran employee on a new assignment against a capable new hire given the same assignment. If the veteran falls behind, the gap is lost adaptability, not task difficulty. Where it breaks: a new hire has life experience. The fresh network has only random numbers, which is exactly what makes it a clean yardstick.

**MIRIAM:** But a gap can have other causes. Two suspects had to be excluded.

**LUCÍA:** Forgetting, losing old knowledge: ruled out by design, because at every task the network trains on old and new classes together. Overfitting, fitting the training images so closely that test accuracy suffers: a new risk, because early classes are retrained again and again. Two countermeasures. Early stopping: before each new task begins, the parameters are reset to those that achieved the top test accuracy in the current task. And random data transformations.

*[SFX: soft chime]*

**LUCÍA:** The preprocessing line. One: each pixel value is divided by 255, so values run from 0 to 1. Two: each channel is normalized with the sample mean and standard deviation computed from the entire training set. Three, each time a training image is sampled, data augmentation: a random horizontal flip with probability 0.5;

*[SFX: card flipped]*

**LUCÍA:** a random rotation by an angle drawn uniformly between 0 and 15 degrees;

*[SFX: card twisted on felt]*

**LUCÍA:** and a random crop, which in the thesis's wording pads the image by 4 pixels on every side, then downsamples it back to its original size.

**DEV:** So Monday's frog isn't quite Tuesday's frog. Harder to memorize.

**MIRIAM:** The expectation, then. With forgetting prevented and overfitting reduced, changes relative to the fresh system should be mainly due to plasticity. Keep it, and the score stays above zero. Lose it, and the score falls below.

*[MUSIC: bed out]*

### Act Two — The Residual Network

*[TIMECODE: 09:30]*

*[MUSIC: "Still Learning" theme, low]*

**MIRIAM:** Thesis section 7.2. The first modern suspect: ResNet-18.

**NORA:** That's me. A residual network with 18 layers. My key innovation is the skip connection: inside each residual block, the block's input bypasses the block's layers and is added to their output. My residual blocks are grouped into residual stacks. I have batch normalization, which rescales each channel using statistics of the current mini-batch, then applies a learned scale, gamma, and a shift, keeping values in a stable range. And average pooling, which replaces each channel's grid with its average.

*[TAPE: Dr. Priya Venkataraman, recorded in a server room; fans hum]*

**DR. VENKATARAMAN:** Picture one block. The main path runs down through two convolutions. The skip path carries the input around them and adds it back just before the final ReLU. When the block shrinks the image, stride above 1, a small downsample convolution resizes the input so the two can be added. Remember those downsample layers. They get special treatment later.

**LUCÍA:** Audio figure: Figure 7.2. Panel a, building blocks. The convolutional block: a convolutional layer, set by output channels, kernel size, stride and padding, whose dimensions change with stride and padding; then batch normalization; then ReLU. The residual block: a convolutional block with kernel 3; then a convolutional layer with the same output channels, kernel 3, stride 1, padding 1; batch norm; the add, a circle with a plus; ReLU. The skip path goes straight to the plus when stride is 1. When stride is above 1 it passes through a downsample convolutional layer, same output channels and stride as the convolutional block, kernel size and padding 1, then a batch norm. The residual stack: residual block 1 with the given channels, stride and padding, then residual block 2 with the same channels, stride 1, padding 1.

**LUCÍA:** Panel b, the full network. Input, 32 by 32 by 3. Convolutional block, 64 channels, kernel 3, stride 1, padding 1: 32 by 32 by 64. Residual stack 1, 64 channels, stride 1: still 32 by 32 by 64. Stack 2, 128 channels, stride 2: 16 by 16 by 128. Stack 3, 256 channels, stride 2: 8 by 8 by 256. Stack 4, 512 channels, stride 2: 4 by 4 by 512. All stacks with padding 1. Average pooling, kernel 4 by 4, listed with stride 0 and padding 0: 1 by 1 by 512. Flatten: 512 numbers. A linear output layer with as many units as the current number of classes. Total: 11,224,932 parameters.

**DEV:** Eleven million. Nora, you've grown.

**NORA:** I eat my vegetables.

**MIRIAM:** What it shows: a deep, standard image network, far larger than those of the previous chapter.

**CAPT. AL-HARBI:** *Analogy.* A skip connection is an executive summary stapled to the front of a detailed report. Each layer adds detail, but the original message always gets through. Where it breaks: a summary is shorter than the report. The skip connection carries the full input.

*[TAPE: Prof. Tomás Adeyemi, recorded in his office; chalk taps a board]*

**PROF. ADEYEMI:** Training. SGD with momentum 0.9 and L2 regularization. Two hundred epochs per task, so four thousand in total. The step-size shrinks as training proceeds: in each task it starts at 0.1 and is decreased by a factor of 0.2 after 60, 120 and 160 epochs, and the schedule resets at the start of each task. The starting value and schedule follow Weiaicunzai, 2022. The L2 factor was tuned to maximize top accuracy on the entire dataset. Initialization: Kaiming normal for weight matrices, zero biases, batch norm's gamma set to one.

*[SFX: soft chime]*

**LUCÍA:** Reading "decreased by a factor of 0.2" as multiplied by 0.2: step-size 0.1 for epochs 1 to 60, 0.02 to epoch 120, 0.004 to epoch 160, 0.0008 to epoch 200. Then the next task starts again at 0.1.

**DEV:** A staircase that goes down four steps, then teleports back to the top. Twenty times.

*[SFX: ledger bell]*

**THE AUDITOR:** An entry from the appendix. Table A.22, which feeds Figure 7.3, lists the base system's initial step-size as 0.1. Table A.24, for the reinitialization experiments, cites the base system as "initial step-size equals 0.2," pointing back to Table A.22. Since the schedule starts at 0.1 and is multiplied by 0.2, the book reads the 0.2 as most likely the decay factor, not a different starting value. That is the book's reading; the thesis does not comment. Starting value: 0.1.

*[SFX: ledger closes]*

**MIRIAM:** That tuned system is the base system. The baseline beside it: the base system plus shrink-and-perturb. With L2 already present, its only extra hyperparameter is the standard deviation of the noise, tuned to maximize average top test accuracy across tasks.

*[MUSIC: tension underscore, a single low string]*

**LUCÍA:** Audio figure: Figure 7.3. X-axis, number of classes, 5 to 100. Each line averages 15 runs; shading is one standard error. Panel a: top test accuracy, 70% to 90%. Base system in black, shrink-and-perturb in orange, fresh base system in grey. All three fall from about 89% at 5 classes. At 100 classes, read off the chart: fresh near 76%, shrink-and-perturb near 74.5%, base near 71%.

**DEV:** Everyone falls. The exam got harder.

**LUCÍA:** So panel b: accuracy relative to the fresh base system, minus 5% to plus 3%, with a dashed zero line for the fresh system. In the first tasks both incremental systems beat the fresh one, peaking at about plus 2% around 15 classes. Then they cross below zero. Shrink-and-perturb ends near minus 1.5%. The base system keeps falling, to near minus 5%.

**NORA:** I was two points ahead. Then the new hire passed me.

*[SFX: rising tone that thins and flattens]*

**MIRIAM:** About five points behind a network trained from scratch. A carefully tuned residual network no longer learns new tasks as well as a fresh one. Unless it's overfitting. The countermeasures reduce overfitting; they can't rule it out. So the thesis tests for it directly.

*[TAPE: Dr. Sun-Hee Park, recorded in a seminar room; a projector fan whirs]*

**DR. PARK:** Think about what overfitting would look like. The classes trained longest are the earliest. If the network were overfitting, those would show lower test accuracy, and later classes would be classified more accurately than early ones. That would produce a positive correlation between the order in which a class was introduced and its accuracy on the last task.

**DR. PARK:** The test. On the final task, rank the 100 classes' test accuracies from highest, rank 0, to lowest, rank 99. Compute the Spearman rank correlation between those ranks and the introduction order. Spearman asks whether two orderings move together: plus one identical, minus one reversed, zero unrelated. Then a p-value from a two-sided permutation test: shuffle the pairing many times to see how often a correlation at least this large arises by chance when the true correlation is zero. A small p-value, conventionally below 0.05, means the correlation is unlikely to be chance. No overfitting, correlation near zero.

**DEV:** Why shuffle instead of using a formula?

**DR. PARK:** Let me ask you. If I handed out a hundred boarding passes at random, how often would seat numbers line up with check-in order?

**DEV:** Almost never.

**DR. PARK:** The shuffle measures how far "almost never" wanders from zero, using the data itself.

**LUCÍA:** Table 7.1, 15 independent runs. Base system: Spearman correlation 0.0210, p-value 0.4136. Fresh base system: minus 0.0091, p-value 0.7106. Shrink-and-perturb: minus 0.0088, p-value 0.7406.

**DR. PARK:** All three correlations are tiny, between minus 0.01 and plus 0.02. All p-values are large, 0.41 to 0.74. No evidence of a link between when a class arrived and how well it is classified. The gap is not overfitting. The main effect is loss of plasticity.

**CAPT. AL-HARBI:** *Analogy.* An audit sample check. If veterans' errors clustered on the oldest product lines, you'd suspect over-familiarity. They don't, so the problem is general loss of adaptability. Where it breaks: an auditor can interview the veteran. Here the only witness is the statistics.

**MIRIAM:** Exhibit one at the frontier. Eleven million parameters, momentum, L2, batch norm, a schedule, augmentation. It loses plasticity, and not because of overfitting.

### Act Three — The Transformer and the Volume Knob

*[TIMECODE: 19:00]*

*[MUSIC: "Still Learning" theme, a new figure in the piano, higher and colder]*

**MIRIAM:** Thesis section 7.3. The vision transformer. It also loses plasticity. But measuring that cleanly required first removing two distortions: overfitting, and a trivial collapse inside layer normalization.

**NORA:** I've changed again. I don't see a picture as a grid anymore. I see it as a sentence.

*[TAPE: Dr. Priya Venkataraman, server room, continued]*

**DR. VENKATARAMAN:** Vision transformers adapt the transformer to images, from Dosovitskiy and colleagues, 2021, and they've become the standard for state-of-the-art vision. A transformer processes a sequence of tokens, vectors of numbers. Its core is self-attention: each token computes how much to attend to every other token and builds its new value as a weighted mix of them. Multi-head attention runs several of these in parallel. The building block is the encoder block: multi-head self-attention, then a fully-connected layer and a linear layer. This one stacks eight encoder blocks: 14,279,140 learnable parameters, 12 attention heads per block, hidden dimension 384, 1,536 units in the fully-connected layers. Two more terms. Layer norm rescales each token's values to a standard range, then applies a learned scale gamma and shift beta. GELU is a smooth activation similar to ReLU.

**LUCÍA:** Audio figure, the pipeline. The image is cut into an 8-by-8 grid of patches; each patch becomes a token of 384 numbers; a class token is added, 65 tokens; positions are marked; eight encoder blocks let tokens exchange information; only the class token is read out for the answer.

**LUCÍA:** Figure 7.4, panel a. The fully-connected block: fully-connected layer, input 384, output 1,536, giving 65 by 1,536; GELU; dropout 1; linear layer, 1,536 in, 384 out, giving 65 by 384; dropout 2. The encoder block: input 65 by 384; layer norm; multi-head self-attention; dropout; add the input, circle-plus; layer norm; fully-connected block; add again; output 65 by 384. Vertical lines on the right are skip connections. Panel b: image 32 by 32 by 3; convolutional layer, 384 channels, kernel 4, stride 4, padding 0, giving 8 by 8 by 384; reshape to 64 by 384; concatenate the class token, 65 by 384; add the positional embedding elementwise; dropout; eight encoder blocks; retrieve the class token, 384 numbers; linear output layer, one unit per current class. Dropout randomly sets some values to zero during training, a standard guard against overfitting.

**MIRIAM:** What it shows: a modern transformer. The kernel-4, stride-4 convolution turns the image into patches. The class token is an extra learned token whose final value summarizes the image. The positional embedding tells the network where each patch came from.

**PROF. ADEYEMI:** Training: SGD with momentum 0.9, L2 regularization and dropout. One hundred epochs per task, two thousand in total. A linear step-size schedule: the step-size rises linearly to its maximum over the first 30 epochs, then falls towards zero. Unlike ResNet-18's, it updates after every mini-batch. It resets each task. Tuned: the L2 factor, the maximum step-size, and the dropout probability. Initialization is more intricate; it's in thesis Appendix A, section A.4.

**DEV:** "Falls towards zero." Remember that, everyone.

*[MUSIC: tension underscore]*

**DR. PARK:** Problem one: overfitting. Over five runs of the tuned incremental system, Spearman correlation 0.1269, two-sided permutation p-value 0.0032. Enough to reject "no correlation." In the last task it was more accurate on late-arriving classes than early ones. Overfitting, which would contaminate the plasticity measurement.

**PROF. ADEYEMI:** The fix: decouple the regularization factor from the step-size. Equation 7.1, the standard SGD update with L2 regularization, in words: theta t plus one is defined as theta t, minus alpha t times the gradient, with respect to theta t, of the loss ell of f-theta-t of x t and y t, minus lambda alpha t theta t.

**PROF. ADEYEMI:** Symbol by symbol. Theta t: all the network's parameters at update step t; theta t plus one, the updated version. The equals sign with a dot means "is defined as." Alpha t: the step-size at step t, subscripted because the schedule changes it every update. The gradient term tells you how the error ell, on input x t with correct answer y t, changes as each parameter changes; f-theta-t is the network's prediction. Minus alpha t times that gradient is the usual learning step downhill. Minus lambda alpha t theta t is L2 regularization, pulling every parameter toward zero in proportion to its size. Lambda, greater than or equal to zero, is the regularization factor. And because the pull is also scaled by alpha t, this is coupled regularization.

**PROF. ADEYEMI:** Decoupling removes alpha t from the last term: theta t plus one is defined as theta t, minus alpha t times the gradient, minus lambda theta t. The learning step is unchanged. The pull toward zero, lambda theta t, no longer shrinks as the step-size falls. A more severe form of regularization: it keeps biasing parameters toward zero all the way through the schedule. The thesis calls it decoupled regularization.

*[SFX: ledger bell]*

**THE AUDITOR:** A label, not a slip. This is the thesis's own sense of "decoupled": the penalty is not scaled by the step-size. It differs from SGDW, last episode, which keeps the penalty out of the momentum average. Same word, different change.

*[SFX: ledger closes]*

*[SFX: soft chime]*

**LUCÍA:** One weight, theta equals 2; lambda 0.01. Early in a task, alpha 0.1: coupled shrinkage 0.01 times 0.1 times 2, which is 0.002; decoupled, 0.01 times 2, 0.02. Late in the task, alpha 0.001: coupled falls to 0.00002. Decoupled stays at 0.02.

**DEV:** The coupled tug falls asleep at the end of each task. The decoupled one never stops.

*[MUSIC: low, uneasy]*

**MIRIAM:** Decoupling reduced overfitting. It also exposed a second problem. The scaling parameter of layer norm shrank over time.

**UNIT 47:** Can anyone hear me? I'm talking at full volume. I think.

**UNIT 12:** You're very faint, forty-seven.

**PROF. ADEYEMI:** Layer norm, in words: y is defined as x minus x-bar, over the square root of s squared plus epsilon, times gamma, plus beta. x is one element of a vector of activations; y the normalized output. x-bar is the layer's average activation; s squared the variance, the spread. That fraction rescales activations to average 0 and spread 1; epsilon is a small number preventing division by zero. Gamma is a learnable scale, beta a learnable shift; together they let the network choose the output's range.

*[SFX: ledger bell]*

**THE AUDITOR:** An equation number that does not exist. The thesis later refers to this formula as equation "(7.3)," standard layer norm. No equation in the thesis carries that number; this chapter numbers only 7.1 and 7.2. The display meant is the unnumbered layer-norm formula on thesis page 117. Read "(7.3)" as: standard layer norm.

*[SFX: ledger closes]*

**PROF. ADEYEMI:** With decoupled regularization, gamma shrank to extremely low values. The output is multiplied by gamma, so gradients flowing back through layer norm are multiplied by gamma too. Tiny gamma, tiny gradients, severely slowed learning. The thesis calls it a form of plasticity loss with trivial solutions.

**CAPT. AL-HARBI:** *Analogy.* A volume knob turned almost to zero. Whatever the speaker says, almost nothing gets through, in either direction, like an intercom where cockpit and cabin both go deaf. Where it breaks: an intercom knob doesn't turn itself down. Here the regularization keeps turning it, every step.

**LUCÍA:** Remedy one: don't regularize the scale. Omitting regularization on parameter vectors, such as biases and layer norm parameters, is common practice; the book cites Goodfellow and colleagues, 2016, page 226. Matrix regularization penalizes only weight matrices. Full regularization penalizes every parameter. With matrix regularization, nothing pushes gamma toward zero.

**PROF. ADEYEMI:** Remedy two: reparameterize. y is defined as the same normalized x, times one plus gamma, plus beta. The set of functions layer norm can represent is unchanged. But if regularization drives gamma to zero, the scale is one, not zero, and gradients still flow. The thesis calls this reparameterized layer norm, reparam LN, and the original standard LN.

*[SFX: soft chime]*

**LUCÍA:** Gamma driven to 0. Standard LN multiplies by 0: output and gradient vanish. Reparam LN multiplies by 1 plus 0, which is 1: the normalized signal passes intact.

**DEV:** You moved the zero point of the knob. Regularization still pulls toward "zero," but zero now means normal volume.

**UNIT 47:** Oh. I can hear myself again.

*[MUSIC: explainer bed, quickened]*

**LUCÍA:** Three switches give six candidate base systems, colour-coded in the thesis. One: coupled full regularization, standard LN. Two: coupled matrix, standard LN. Three: coupled full, reparam LN. Four: decoupled full, standard LN. Five: decoupled matrix, standard LN. Six: decoupled full, reparam LN. Matrix with reparam isn't listed because it's equivalent to matrix with standard LN: either way the scale isn't penalized.

**DR. PARK:** Tuning: for candidate one, step-size, regularization factor and dropout probability were tuned to maximize top test accuracy on the entire CIFAR-100 dataset. The other five reused that step-size and dropout and tuned only their L2 factor.

**DR. PARK:** Table 7.2, five runs of each. Coupled full, standard LN: correlation 0.1269, p 0.0032. Coupled matrix, standard LN: 0.1080, p 0.0154. Coupled full, reparameterized LN: 0.1163, p 0.0120. Decoupled full, standard LN: 0.0636, p 0.1500. Decoupled matrix, standard LN: 0.0679, p 0.1394. Decoupled full, reparam LN: 0.0428, p 0.3396.

**DR. PARK:** Coupled correlations 0.108 to 0.127, p-values 0.003 to 0.015. Decoupled correlations 0.043 to 0.068, p-values 0.14 to 0.34. Now, Dev: roll one die, chance of a six?

**DEV:** One in six.

**DR. PARK:** Roll six dice?

**DEV:** Much better odds of at least one six.

**DR. PARK:** Each test is a die with a small chance of a false alarm. Six tests at once raise the chance that one goes off. So you use a stricter cut-off, a multiple-comparisons correction. At a 10% significance level, divide by six: 0.1 over 6, about 0.0167. All three coupled p-values fall below it, so their correlation is significant at that level, and only at that level. None of the decoupled ones do. Conclusion: decoupled regularization reduced overfitting, and in a system that isn't overfitting, a drop in relative performance can only be attributed to loss of plasticity.

**LUCÍA:** Audio figure: Figure 7.5. Each line averages five runs; shading one standard error. Panel a: average magnitude of the layer norm scale, 0 to 1.1, for the three decoupled systems; for reparam LN it plots one plus gamma, so all start at 1. Read off the chart: decoupled full with standard LN collapses from 1.0 to about 0.05 by 50 classes, a line diving to the floor. Reparam LN stays close to 1. Matrix regularization also prevents collapse but drifts up to about 1.1, which the thesis notes could become a problem if it continued, since it would amplify gradients flowing back through layer norm.

**LUCÍA:** Panel b: top test accuracy, 40% to 85%, all six. Coupled systems do worse. At 100 classes: decoupled full with reparam LN highest, about 58.5%; decoupled matrix with standard LN close behind, about 57.5%; decoupled full with standard LN about 51%; the three coupled about 43% to 47%. Reparam beats standard LN, but only slightly ahead of matrix regularization.

**LUCÍA:** Panel c: accuracy relative to each system's own fresh counterpart, minus 16% to plus 4%, ten runs per line, five incremental and five fresh. Every system eventually falls below zero. Decoupled systems fall less steeply: decoupled full with reparam LN near minus 1.5%, decoupled matrix near minus 2%, decoupled full with standard LN near minus 7.5%. Coupled systems end near minus 12% to minus 16%.

**DR. PARK:** For decoupled systems, which overfit less, the main culprit is plasticity loss. For coupled ones, the drop may combine overfitting and plasticity loss.

*[SFX: ledger bell]*

**THE AUDITOR:** One slip here. The thesis says decoupled systems declined less steeply "as the number of tasks decreased." The plot shows it as the number of tasks increases. Tasks only ever increase in this problem.

*[SFX: ledger closes]*

**MIRIAM:** The chosen base system: decoupled full regularization with reparameterized layer norm. No significant overfitting, so a cleaner plasticity measurement. No scale collapse. Best performance. And it still lost plasticity, like every incremental system.

**NORA:** I fixed my volume. I stopped memorizing the frog. And I'm still falling behind the new hire.

*[SFX: rising tone that thins and flattens]*

*[MUSIC: out]*

### Act Four — The Cure at the Frontier

*[TIMECODE: 33:00]*

*[MUSIC: "Still Learning" theme, steady]*

**MIRIAM:** Thesis section 7.4. Both modern networks lose plasticity. Now the cure.

**LUCÍA:** Unit reinitialization in ResNet-18 works as in last episode's convolutional networks. The channel is the unit; its utility is computed as for fully-connected units, after averaging the channel over its width and height to one number. It's applied to every convolutional layer except downsample layers, skipped because their connectivity is more complex. Utilities use the ReLU outputs. Reinitializing a unit resets its input weights, its entries in the batch norm layer, and its output weights into the next convolutional layer; batch norm's scale goes back to one, its shift to zero.

*[SFX: click and hum]*

**UNIT 88:** Recycled. New input weights, batch norm scale back to one. Ready.

**LUCÍA:** Selective weight reinitialization works on individual weights, so it applies to any architecture: every vector, matrix and tensor is considered. Settings: continual backprop, contribution utility and hemi-reinitialization. ReDo, the same. SWR, first-order utility, threshold pruning, resample reinitialization.

**DEV:** ReDo with contribution utility? I thought ReDo was the activation one.

**LUCÍA:** During tuning, ReDo with its usual activation utility did not improve on the base system. It's the first setting in the thesis where activation versus contribution utility made a noticeable difference for ReDo. All systems share the base system's step-size and L2 factor; each algorithm's own hyperparameters were tuned to maximize average top test accuracy, Tables A.24 and A.25.

**LUCÍA:** Audio figure: Figure 7.6. Shading one standard error. Panel a, ResNet-18: accuracy relative to the fresh base system, minus 5% to plus 3%, 15 runs per line. Continual backprop yellow, SWR blue, ReDo green, shrink-and-perturb orange, base black. Read off the chart: black slides to about minus 5%, orange ends near minus 1.5%. Yellow, blue and green braid together just above the dashed zero, about plus 0.2% at 100 classes, with no discernible difference between them.

*[MUSIC: a single warm chord]*

**MIRIAM:** In ResNet-18, selective reinitialization fully maintained plasticity.

**NORA:** Twenty tasks in, I learn the hundredth class as well as a newborn would.

*[BEAT]*

**MIRIAM:** Then the transformer.

**LUCÍA:** SWR on every vector, matrix and tensor. Unit reinitialization only on the fully-connected layers inside each encoder's fully-connected block, from Figure 7.4a: self-attention layers have no clear notion of a unit, so it isn't feasible there. Unit utilities use the GELU output. Base system: decoupled full regularization with reparam LN. Here continual backprop used contribution utility and ReDo used activation utility, both hemi-reinitialization; SWR first-order utility, threshold pruning, resample.

**LUCÍA:** Panel b, vision transformer, same measure, minus 10% to plus 4%, 20 runs per line. Reinitialization was slightly less effective. The bigger finding is instability: in the last task, several runs diverged.

**DR. VENKATARAMAN:** The numbers blew up. One run of the base system, three of ReDo, one of continual backprop. Their averages plunge at the very end, read off the chart: ReDo to about minus 10%, continual backprop about minus 5%, base about minus 4.5%. Section 7.3 never saw this because it used only five runs, none of which diverged. Rare failures need many runs to show.

**LUCÍA:** Panel c shows why. Median weight magnitude of the key, query and value matrices in the last attention layer, log scale from ten to the minus 2 down to ten to the minus 20, diverged runs omitted. ReDo averages 17 runs, continual backprop and base 19, the rest 20. Grey line: the fresh base system.

**DR. VENKATARAMAN:** Keys, queries and values are attention's three matrices. A query asks "what am I looking for?" Keys say "what do I contain?" Values carry the content passed on. In the base system, continual backprop and ReDo, the median weight falls from about ten to the minus 2 to about ten to the minus 17 by 100 classes, ReDo to about ten to the minus 20. Numbers that small cause numerical instabilities, which eventually caused divergence. Shrink-and-perturb and SWR, which inject noise into the attention layers, keep those weights near ten to the minus 2, close to the fresh system, and avoided divergence.

**MIRIAM:** Unit methods can't reach attention, because attention has no units. The methods that could reach it kept it alive.

**THE THESIS:** From the thesis, adapted. Such instabilities can be prevented by methods unrelated to plasticity, such as gradient clipping or weight clipping, capping values. So divergence is set aside, and the runs that did not diverge are examined.

**LUCÍA:** Figure 7.7, without diverged runs. Same run counts, shading one standard error. Panel a, for completeness: top test accuracy, 60% to 80%, with the fresh system in grey; all fall from about 79% at 5 classes to about 59 to 60% at 100. Panel b: relative to fresh, minus 2% to plus 4%. All peak near plus 3.5% at 10 classes, then decline. At 100 classes, read off the chart: base and shrink-and-perturb near minus 1.7%; continual backprop, ReDo and SWR higher, between about minus 1% and minus 0.5%. Still below zero.

**LUCÍA:** And the surprise. Ignoring divergence, unit reinitialization matched SWR, though the unit methods touched only the fully-connected blocks and SWR acted on every layer. The reinitialization methods beat shrink-and-perturb, but none completely prevented plasticity loss.

**THE THESIS:** From the thesis, adapted. In ResNet-18 every reinitialization approach maintained plasticity. In the vision transformer, selective reinitialization mitigated plasticity loss but did not prevent it, while still being the most effective approach tested. These transformer results are the frontier of plasticity-loss demonstrations, in this thesis and the prior literature. Further work is needed to guarantee plasticity in transformers.

*[MUSIC: low strings, unresolved]*

**NORA:** The recycling helps. I want to be honest about that. But something in me is still closing.

*[BEAT]*

**MIRIAM:** Section 7.5. Do the old warning lights, frozen units rising and stable rank falling, come on here?

**LUCÍA:** ResNet-18: downsample layers excluded from frozen-unit counts; stable rank on the 512-dimensional flatten output before the linear output layer.

*[SFX: ledger bell]*

**THE AUDITOR:** Before you read Figure 7.8. Panel a's title in the thesis reads "Performance in Vision ResNet-18." There is no vision ResNet-18 here. It is ResNet-18.

*[SFX: ledger closes]*

**LUCÍA:** Figure 7.8, 15 runs per line, shading standard error. Panel a repeats Figure 7.6a. Panel b: percent frozen units, 0% to 55%, fresh system shown. Panel c: stable rank, 380 to 490, maximum 512. Read off the chart: the base system's frozen units rise from about 0% to about 55% by 100 classes; shrink-and-perturb about 4%; continual backprop, ReDo, SWR and fresh near 0 to 2%. Base stable rank falls from about 490 to about 385; shrink-and-perturb dips and settles near 457; the three reinitialization methods and fresh dip early, then recover to about 473 to 475.

**UNIT 12:** In the base system half of us went quiet. In the recycled ones, almost none.

**MIRIAM:** In ResNet-18, systems that kept plasticity avoided the pathologies. Frozen units and stable rank remain useful diagnostics.

**LUCÍA:** The transformer: stable rank on the class token, frozen units on the fully-connected layer outputs. And no unit in any system was frozen.

**PROF. ADEYEMI:** The GELU frozen test, in words: g of w dot x i plus b is less than zero for all x i in a mini-batch. g is GELU; w the input weights; b the bias; x i one input; w dot x i plus b the pre-activation. Frozen if the output is negative for every input. None were. So the thesis relaxes it: g of w dot x i plus b less than epsilon for all x i, for some epsilon greater than zero; here epsilon is 0.01. A unit below that for every input is dormant: alive in principle, nearly silent in practice.

**LUCÍA:** Figure 7.9, four panels. ReDo 17 runs, continual backprop and base 19, others 20, shading one standard error. Panel a: relative performance without diverging runs, as in 7.7b. Panel b: percent dormant units, 0% to 85%. Panel c: stable rank, about 255 to 360, maximum 384. Panel d: mean entropy of the attention weights, 3.95 to 4.10, maximum about 4.17.

**LUCÍA:** Read off the chart. Dormant units: base jumps to about 80% by roughly 25 classes and stays. Continual backprop accumulates almost as many, about 80%, yet mitigated plasticity loss. ReDo spikes to about 50%, settles near 20%. SWR, shrink-and-perturb and fresh stay near 0%. Not a reliable predictor. Stable rank: base drops to about 255 at 20 classes, then slowly recovers to about 325; continual backprop follows a nearly identical path despite mitigating the loss. Not reliable either.

**DR. VENKATARAMAN:** So the thesis looked for a transformer-specific signal. Attention weights are the output of a SoftMax, which turns raw scores into positive weights summing to one. They decide which parts of the image to focus on. If a few dominate, the model fixates on a few aspects and ignores the rest. If they're uniform, it attends to nothing in particular and isn't really using attention. Both extremes are undesirable.

**LUCÍA:** Entropy catches both. Equation 7.2, in words: entropy of w is defined as minus the sum, over j from 1 to n, of w of j times log of w of j. w of j is the j-th attention weight, between 0 and 1, all n summing to 1. Logs of weights below 1 are negative, so the leading minus makes entropy positive. Each term weighs how surprising an entry is by how much weight it carries. Uniform weights give log n, the maximum. Weight concentrated on a few entries drives entropy toward zero.

*[SFX: soft chime]*

**LUCÍA:** Four coffee cups. Pour 0.25 into each: entropy log 4, about 1.386. Pour 0.97 into one and 0.01 into the others: about 0.168. Each image here has 65 tokens; log 65 is about 4.17, consistent with the axis maximum in Figure 7.9d.

**LUCÍA:** Panel d: every incremental system sits near 4.05 to 4.07, ReDo near 4.10, close to maximum, nearly uniform. But the fresh system is near-uniform too, starting about 3.94 and rising to about 4.07. High entropy doesn't separate the systems that lose plasticity.

**THE ARCHIVIST:** *[AMBIENCE: archive room, page turns]* This matches Hyeon-Woo and colleagues, 2023, who reported that attention weights in vision transformers often have high entropy. Figure 7.9d is not unusual for this architecture.

**MIRIAM:** Mixed results. In ResNet-18 the familiar correlates returned. In the vision transformer, none of frozen units, dormant units, stable rank or attention entropy reliably correlated with plasticity loss.

**CAPT. AL-HARBI:** *Analogy.* Warning lights that work on a piston engine give no useful signal on a jet. The fault is real; the instruments need redesigning. Where it breaks: when we moved to jets, we understood the engine. Here the engine isn't understood yet.

*[MUSIC: archive bed]*

**MIRIAM:** Section 7.6. Where does this sit in the record?

*[TAPE: Dr. Elena Marchetti, recorded in a university library]*

**DR. MARCHETTI:** Earlier work used simpler networks, simpler problems, or both. Only one other study is as large. But the field has been moving toward complex systems.

**THE ARCHIVIST:** Chaudhry and colleagues, 2018: the first plasticity-loss study with a ResNet-18, in a similar class-incremental CIFAR-100 setting, but focused on preventing forgetting, with only five classes per task, each an easier problem. Ash and Adams, 2020: residual networks did worse under warm-starting, training on a subset then the whole dataset; one shift, not several. Elsayed and colleagues, 2024: warm-starting with a ResNet-18; still one shift. Lyle and colleagues, 2023: ResNet-18 and vision transformers in a direct plasticity study, on a reinforcement learning problem built from CIFAR-10 and MNIST, smaller than this one. Elsayed and Mahmood, 2024: a pre-trained ResNet-50 on Continual ImageNet, only the fully-connected layers trained by SGD. Farias and Jozefiak, 2025: vision transformers on Continual ImageNet, simpler because each task is binary.

**THE ARCHIVIST:** At comparable scale. Lee and colleagues, 2024: ResNet-18 and vision transformers on tasks from CIFAR-10 and CIFAR-100, made non-stationary by injecting normal noise with decreasing variance, a smoother problem. Lewandowski and colleagues, 2025: class-incremental Tiny ImageNet, with a ResNet-18 and a similar vision transformer, but without a step-size schedule.

**DR. MARCHETTI:** To date, this chapter's demonstrations and Lewandowski and colleagues' are the largest-scale demonstrations of plasticity loss with modern architectures.

*[MUSIC: theme, pared down]*

**MIRIAM:** Section 7.7. Even systems with several state-of-the-art techniques lose plasticity on non-stationary data. SWR was straightforward to apply to any network; unit reinitialization only to selected parts. Both prevented plasticity loss in ResNet-18; in vision transformers they only mitigated it. And the thesis names a suspect it did not control for.

**PROF. ADEYEMI:** The step-size schedule. ResNet-18: changes three times per task, never reaches zero. Vision transformer: changes after every mini-batch, decreases until it reaches zero. Reinitialized units or weights need time to grow and mature. With a step-size falling toward zero they get ever smaller updates and mature more slowly, so the same structures may be reinitialized again and again.

**UNIT 88:** Recycled. But no updates. Still small. Still low utility. Oh no.

*[SFX: click and hum]*

**UNIT 88:** Again.

*[SFX: click and hum]*

**CAPT. AL-HARBI:** *Analogy.* Hiring replacements during a freeze that also cuts training budgets to zero. New staff never get up to speed, are judged unproductive, and are replaced again. Where it breaks: a technician can study on his own time. A weight learns only through the step-size it's given.

**MIRIAM:** Future work, one: account for the schedule when reinitializing, by giving new weights a larger step-size, or with a meta-learning algorithm that adapts step-sizes, such as Incremental Delta-Bar-Delta, Sutton, 1992, or its extension, Sharifnassab and colleagues, 2024. Two: study more deeply how transformers lose plasticity. The correlates behaved differently, and reinitializing only fully-connected layers matched SWR across the whole network. Plasticity loss in transformers behaves unlike every architecture studied before. The thesis suggests scaling down to a simpler, inexpensive problem that allows many evaluations.

**THE THESIS:** From the thesis, adapted. The demonstrations were insightful, but much more remains to be done to fully understand and prevent the problem.

**NORA:** So I'm the frontier. Not a solved case. An open one.

*[MUSIC: explainer bed, softer]*

**DEV:** A listener question, from someone on a hospital imaging team: "We retrain a vision transformer on new scans. Can we bolt on selective weight reinitialization and call it fixed?"

**DR. VENKATARAMAN:** Not "fixed," on this evidence. In the thesis's transformer, SWR mitigated plasticity loss and avoided the divergence that hit other runs, among the most effective approaches tested, but it didn't fully prevent the loss. And frozen units, dormant units, stable rank and attention entropy didn't track the problem, so they're poor monitors. The yardstick that worked is the thesis's own: compare against a system trained fresh on the same data. And your setup differs from the thesis's twenty-task problem, which the book doesn't test.

*[MUSIC: out]*

### Finale — The Verdict

*[TIMECODE: 49:00]*

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano. Full, unhurried.]*

**MIRIAM:** Book Chapter 21. Thesis Chapter 8, pages 129 to 131. No figures, tables, equations or algorithms. Only a verdict.

**THE THESIS:** From the thesis, adapted. Loss of plasticity is a general weakness of deep learning systems that learn continually. The usual techniques do not reliably prevent it. Selective reinitialization, at the level of units or of weights, does.

**MIRIAM:** The problem was continual learning with deep networks: a system that keeps learning for its whole life instead of being trained once and frozen. The motivation, plainly: such systems could be cheaper to update and more responsive than those built under today's dominant train-then-deploy framework. Of two big obstacles, the thesis took on plasticity loss, the loss of the ability to learn. The other, catastrophic forgetting, returns at the end.

**CAPT. AL-HARBI:** *Analogy.* A department that has run one playbook for years can still execute, but struggles to absorb a genuinely new process. Where it breaks: a department can be told it's stiff. A network has to be measured.

**MIRIAM:** The case was built methodically, in increasingly complex systems on increasingly difficult continual supervised problems: fully-connected networks on Permuted MNIST, convolutional networks on Continual ImageNet, ResNet-18 and vision transformers on Incremental CIFAR-100. In relatively simple systems, standard techniques such as L2 regularization prevented plasticity loss. In complex systems, even their combination could not. The thesis's summary: techniques commonly used in deep learning are insufficient for robustly preventing plasticity loss in continual learning.

**MIRIAM:** The cure: selective reinitialization. Periodically reset a small, carefully chosen part of the network to fresh values while the rest keeps what it learned. Parameter initialization becomes a continuous process, not a one-time event. Simple as an idea; nuanced in implementation, which is why thesis Chapters 4 and 5, book Chapters 11 to 18, went to the design choices.

**LUCÍA:** Two approaches, one set of parts. Units: selective unit reinitialization, generalizing continual backprop and ReDo. Weights: selective weight reinitialization. Every algorithm has a utility measure, which scores how useful each structure is, the performance review; a pruning criterion, which picks what to reinitialize based on utility, the selection rule; and a reinitialization method, which assigns new values, how the replacement starts the job. In both approaches the choice of each component was essential; a poor utility measure or wrong reinitialization method could sink the whole thing.

**LUCÍA:** The trade-off. Unit reinitialization reinitialized without significantly affecting the output; weight reinitialization frequently had a significant impact on it. Weight reinitialization was often unstable; unit reinitialization isn't flagged as unstable in the conclusion, though ReDo with threshold pruning diverged in thesis Chapter 6. Units must be tailored to each architecture, not always straightforward; weights apply readily to any. And weight reinitialization's instability was ameliorated by L2 regularization.

**CAPT. AL-HARBI:** *Analogy.* Units: replacing a whole team member, clean, but first you define "team member" in every org chart. Weights: reassigning individual responsibilities, works in any org chart, but each reshuffle can jolt output without a stabilizing policy, here L2. Where it breaks: in a company the reshuffle is announced. In a network it shows up only in the output.

*[MUSIC: theme rises]*

**MIRIAM:** The verdict. A wide range of deep learning systems are susceptible to plasticity loss. Selective reinitialization is a robust approach for preventing it.

**MIRIAM:** The evidence, chapter by chapter. Thesis Chapter 3, fully-connected networks on Permuted MNIST: a wide range of systems lose plasticity, including those with residual connections, layer norm, dropout and GELU; scaling mitigated but didn't remove it; L2 and shrink-and-perturb mitigated it, and a 100-unit network with shrink-and-perturb eventually surpassed one ten times its size; the correlates co-occur with no established causal link.

**MIRIAM:** Chapter 4, Permuted MNIST: a general unit-reinitialization algorithm subsumes ReDo and continual backprop. It grew more effective with width, worked with momentum and Adam and with Leaky ReLU, failed with Tanh until first-order utility was used. Weight-magnitude utility did poorly; random utility was only slightly worse than the best; hemi-reinitialization beat full overall.

**MIRIAM:** Chapter 5, Permuted MNIST: SWR was equal to or better than continual backprop and ReDo, the gap shrinking in large networks. Weight-magnitude utility never maintained plasticity. Best: first-order utility, threshold pruning, resample reinitialization. Open problems: large impingement on the output, and persistent reinitialization of the same weights.

**MIRIAM:** Chapter 6, Continual ImageNet: convolutional networks lose plasticity; continual backprop reliably prevented it and performed best; ReDo and SWR became unstable in the mixed network, threshold pruning the common factor; adding L2 removed the instabilities and improved every approach.

**MIRIAM:** Chapter 7, tonight: even systems with many state-of-the-art techniques lose plasticity; both approaches prevented it in ResNet-18; in vision transformers they only mitigated it, the decaying schedule a suspected reason.

*[BEAT]*

**MIRIAM:** The main limitation is scale. Modern state-of-the-art systems are several orders of magnitude larger than those studied. Thesis Chapter 3 showed adding parameters is a viable but expensive mitigation. Is scale alone enough in such systems? The thesis does not claim to answer.

**MIRIAM:** Three avenues remain.

**LUCÍA:** One: refine the algorithms with new utility measures, pruning criteria and reinitialization methods. Recent progress: Frankle and Carbin, 2019, credited with a different pruning criterion for unit reinitialization, introduced in thesis section 4.5 as the paper behind the Lottery Ticket Hypothesis; Liu and colleagues, 2025, a utility measure similar to first-order utility, using the derivative of the loss with respect to the weights without multiplying by the sum of output weights; and the wider neural-network pruning literature.

**PROF. ADEYEMI:** Two, orthogonal to the first: combine reinitialization with step-size adaptation. A fresh structure probably needs large weight adjustments, so a high step-size; as it matures, smaller ones. Methods that adapt step-sizes automatically, such as IDBD, Sutton, 1992, which learns a separate step-size per weight, could significantly improve selective reinitialization. It answers tonight's suspect directly.

*[TAPE: Dr. Hana Lindqvist, recorded in her lab]*

**DR. LINDQVIST:** Three: solve plasticity loss and catastrophic forgetting together. The utility measure is reusable. Prior work used utility measures to stop important structures from changing, which reduces forgetting: Kirkpatrick and colleagues, 2017; Zenke and colleagues, 2017; Aljundi and colleagues, 2018; Elsayed and Mahmood, 2024. Combine that with this thesis: protect the important structures, selectively reinitialize the unimportant ones. One mechanism for both.

**DR. LINDQVIST:** Dev, if you had one performance review for your staff, would you use it only to decide who leaves?

**DEV:** No. Also who to protect.

**DR. LINDQVIST:** That's the idea. And it's an engineering proposal, not a claim about brains.

*[MUSIC: theme, full]*

**NORA:** I started bright. Then I got stiff. Then you gave small parts of me fresh starts, and I kept learning, small, convolutional, residual. As a transformer, I learn better than I would have. Not as well as a newborn. Not yet.

**UNIT 47:** We're still here. Some of us are new. That's the point.

**MIRIAM:** The verdict of this investigation. Plasticity loss is real; it appeared in every architecture studied. The standard tools do not reliably stop it. A continuous practice of small, selective fresh starts, guided by a measure of usefulness, does, in every setting tested but one. That one, the transformer, is where this story is still being written. Can a learning system be updated forever instead of rebuilt? For the systems this thesis studied, yes, if you keep giving parts of it a new beginning. For the largest systems in use today, no one yet knows.

*[MUSIC: theme resolves on a single held note]*

### Three Things to Remember

**LUCÍA:** One. On Incremental CIFAR-100, twenty tasks of five classes, plasticity is incremental minus fresh top test accuracy. A tuned ResNet-18, 11,224,932 parameters, 15 runs, falls to about minus 5%; Spearman correlations near zero, p 0.41 to 0.74, rule out overfitting; continual backprop, ReDo and SWR keep it at or above zero.

**DEV:** Two. The vision transformer, 14,279,140 parameters, needed decoupled regularization against overfitting and reparameterized layer norm against scale collapse, and still lost plasticity. Reinitialization mitigates but doesn't prevent it; collapsing attention weights made 1 base, 3 ReDo and 1 continual backprop run of 20 diverge, while noise-injecting methods avoided it. Frozen units and stable rank track the loss in ResNet-18, but dormant units, stable rank and attention entropy fail in the transformer. Suspect: a per-mini-batch schedule falling to zero.

**MIRIAM:** Three. Plasticity loss appeared in every architecture studied; standard techniques stop it only in simple systems. Selective reinitialization makes initialization continuous, with three parts: utility, pruning criterion, reinitialization method. Units disturb output less but need tailoring; weights fit anywhere but are less stable, eased by L2. Open: scale, better components, step-size adaptation such as IDBD, and forgetting and plasticity loss together.

### Check Your Understanding

*[SFX: soft chime]*

**LUCÍA:** The last quiz. Pause after each.

**LUCÍA:** One. Why can't raw accuracy on Incremental CIFAR-100 reveal plasticity loss, and what's used instead?

*[BEAT]*

**DEV:** Tasks get harder, so accuracy falls anyway. The thesis subtracts the accuracy of a fresh system trained from scratch on the same classes.

**LUCÍA:** Two. What would a positive Spearman correlation between class order and accuracy rank indicate, and what did Table 7.1 find?

*[BEAT]*

**DR. PARK:** That the earliest, most-trained classes do worse: overfitting. Table 7.1 found 0.0210, minus 0.0091 and minus 0.0088, with large p-values. No overfitting.

**LUCÍA:** Three. In equation 7.1, what changes when regularization is decoupled, and why is it more severe?

*[BEAT]*

**PROF. ADEYEMI:** Lambda alpha t theta t becomes lambda theta t. It no longer shrinks as the step-size falls, so the pull toward zero stays strong throughout.

**LUCÍA:** Four. Why does reparameterized layer norm keep gradients flowing when gamma goes to zero?

*[BEAT]*

**DEV:** It multiplies by one plus gamma, so the scale is one, not zero.

**LUCÍA:** Five. What made transformer runs diverge, and what avoided it?

*[BEAT]*

**DR. VENKATARAMAN:** Key, query and value weights in the last attention layer collapsed, causing numerical instability. Shrink-and-perturb and SWR, which inject noise there, avoided it.

**LUCÍA:** Six. Why might a step-size falling to zero weaken selective reinitialization?

*[BEAT]*

**PROF. ADEYEMI:** Fresh structures need sizeable updates to mature; shrinking updates keep them immature, so they're reinitialized repeatedly.

**LUCÍA:** Seven. What does "initialization becomes a continuous process" mean?

*[BEAT]*

**MIRIAM:** Instead of setting starting values once at birth, the system keeps resetting a small, low-utility part of itself to fresh values throughout its life.

**LUCÍA:** Eight. Why choose weight over unit reinitialization, and what keeps it stable?

*[BEAT]*

**DEV:** It works on any architecture without tailoring; L2 regularization ameliorates its instability.

**LUCÍA:** Nine. Why pair reinitialization with step-size adaptation?

*[BEAT]*

**PROF. ADEYEMI:** Fresh structures need large changes quickly and smaller ones later, so a self-adjusting per-structure step-size, such as IDBD, should help them mature faster.

**LUCÍA:** Ten. How can one utility measure address both plasticity loss and forgetting?

*[BEAT]*

**DR. LINDQVIST:** Protect high-utility structures from change, which reduces forgetting, and reinitialize low-utility ones, which keeps plasticity.

### Credits and Next Time

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano]*

**MIRIAM:** That was the final episode of STILL LEARNING. Nine episodes, one idea, from a frozen mind to the frontier.

**LUCÍA:** And thank you to Nora, who lost her plasticity on air every week and complained only once.

**NORA:** Twice.

**MIRIAM:** STILL LEARNING was reported by Miriam Okafor, with Dev Raman and Lucía Ferreira. THE THESIS was read by Graham Asante; Nora was Nell Varga; the Units, our ensemble; the Archivist, Ruth Kellerman; the Auditor, Samir Haddad. Our experts: Dr. Hana Lindqvist, Prof. Tomás Adeyemi, Dr. Priya Venkataraman, Capt. Rashid Al-Harbi, Dr. Sun-Hee Park and Dr. Elena Marchetti.

**MIRIAM:** The thesis is © Juan Fernando Hernandez Garcia, 2026, licensed CC BY 4.0, adapted here with credit. All experts and actors in this series are fictional. The thesis, *Selective Reinitialization Algorithms for Preventing Plasticity Loss in Artificial Neural Networks*, University of Alberta, is taught through the guided book *Keeping Neural Networks Learning*. Code: github.com/JFernando4/plasticity-via-reinit.

*[SFX: ledger bell]*

**THE AUDITOR:** One ledger remains open. Every grid search, every setting tried and chosen.

**MIRIAM:** Next time, a bonus episode: "The Fine Print." Appendices A and B and the back matter. How every algorithm got a fair search before it was compared, and where that 0.2 came from.

**THE AUDITOR:** Bring a calculator.

*[MUSIC: theme resolves and fades]*

### Show Notes

**Episode 9 — The Frontier.** Book Chapter 20 (thesis Ch. 7 opening, §7.1–§7.7, pp. 110–128) and Book Chapter 21 (thesis Ch. 8, pp. 129–131). Hyperparameters: thesis Tables A.22–A.25 (bonus episode).

**Equations**

Equation 7.1 — SGD with coupled L2 regularization:

```latex
\boldsymbol{\theta}_{t+1} \doteq \boldsymbol{\theta}_t - \alpha_t \nabla_{\boldsymbol{\theta}_t} \ell\big(f_{\boldsymbol{\theta}_t}(\mathbf{x}_t), \mathbf{y}_t\big) - \lambda \alpha_t \boldsymbol{\theta}_t
```

Unnumbered (§7.3) — decoupled regularization:

```latex
\boldsymbol{\theta}_{t+1} \doteq \boldsymbol{\theta}_t - \alpha_t \nabla_{\boldsymbol{\theta}_t} \ell\big(f_{\boldsymbol{\theta}_t}(\mathbf{x}_t), \mathbf{y}_t\big) - \lambda \boldsymbol{\theta}_t
```

Unnumbered (thesis p. 117; cited in the text as "(7.3)", a number no equation carries) — standard layer norm:

```latex
y \doteq \frac{x - \overline{x}}{\sqrt{s^2 + \epsilon}} \cdot \gamma + \beta
```

Unnumbered (§7.3) — reparameterized layer norm:

```latex
y \doteq \frac{x - \overline{x}}{\sqrt{s^2 + \epsilon}} \cdot (1 + \gamma) + \beta
```

Unnumbered (§7.5) — frozen GELU unit:

```latex
g(\mathbf{w} \cdot \mathbf{x}_i + b) < 0 \quad \text{for all } \mathbf{x}_i \text{ in a mini-batch}
```

Unnumbered (§7.5) — dormant unit (ε = 0.01):

```latex
g(\mathbf{w} \cdot \mathbf{x}_i + b) < \epsilon \quad \text{for all } \mathbf{x}_i, \text{ for some } \epsilon > 0
```

Equation 7.2 — attention entropy:

```latex
\mathrm{Entropy}(\mathbf{w}) \doteq -\sum_{j=1}^{n} \mathbf{w}[j] \log\big(\mathbf{w}[j]\big)
```

Thesis Chapter 8 has no figures, tables, equations or algorithms.

**Audio figures**

- Figure 7.1 — Incremental CIFAR-100: card stacks for Tasks 1, 2 and 20; five classes added per task up to 100.
- Embedded diagram (§20.2) — two lanes, one score: incremental minus fresh accuracy on the same classes.
- Embedded diagram (§20.3) — ResNet-18 residual block: two convolutions, skip path added before the final ReLU, downsample when stride exceeds 1.
- Figure 7.2 — ResNet-18 building blocks and full architecture (32 × 32 × 3 to 512-dimensional flatten); 11,224,932 parameters.
- Figure 7.3 — ResNet-18 raw and fresh-relative accuracy: early lead near +2%, base ends near −5%, shrink-and-perturb near −1.5%.
- Embedded diagram (§20.4) — transformer pipeline: 8 × 8 patches, 65 tokens with class token, eight encoder blocks.
- Figure 7.4 — Vision transformer blocks and architecture; 14,279,140 parameters, 12 heads, hidden 384, 1,536 units.
- Figure 7.5 — Six candidates: LN scale collapses to about 0.05 under decoupled full with standard LN; decoupled full with reparam LN best (about 58.5%) and loses least (near −1.5%).
- Figure 7.6 — Reinitialization keeps ResNet-18 near +0.2%; transformer runs diverge as last-layer key/query/value weights fall to about 10⁻¹⁷–10⁻²⁰, except under shrink-and-perturb and SWR.
- Figure 7.7 — Transformer without diverged runs: reinitialization ends between about −1% and −0.5%, base and shrink-and-perturb near −1.7%.
- Figure 7.8 — ResNet-18 correlates: base frozen units to about 55%, stable rank to about 385; reinitialized systems avoid both.
- Figure 7.9 — Transformer correlates: dormant units, stable rank and attention entropy fail as predictors.
- Embedded diagram (Ch. 21) — the thesis argument in one picture: problem, cure, evidence, open questions.

**Tables**

Table 7.1 — ResNet-18, 15 runs:

| Learning system | Spearman correlation | p-value |
| --- | --- | --- |
| Base system | 0.0210 | 0.4136 |
| Fresh base system | −0.0091 | 0.7106 |
| Shrink-and-perturb | −0.0088 | 0.7406 |

Table 7.2 — Vision transformer candidates, five runs each; corrected threshold 0.1 / 6 ≈ 0.0167:

| Learning system | Spearman correlation | p-value |
| --- | --- | --- |
| Coupled full regularization with standard LN | 0.1269 | 0.0032 |
| Coupled matrix regularization with standard LN | 0.1080 | 0.0154 |
| Coupled full regularization with reparameterized LN | 0.1163 | 0.0120 |
| Decoupled full regularization with standard LN | 0.0636 | 0.1500 |
| Decoupled matrix regularization with standard LN | 0.0679 | 0.1394 |
| Decoupled full regularization with reparam LN | 0.0428 | 0.3396 |

Algorithm settings:

| Algorithm | ResNet-18 | Vision transformer |
| --- | --- | --- |
| Continual backprop | Contribution utility, hemi-reinitialization | Contribution utility, hemi-reinitialization |
| ReDo | Contribution utility, hemi-reinitialization | Activation utility, hemi-reinitialization |
| SWR | First-order utility, threshold pruning, resample | First-order utility, threshold pruning, resample |

Step-size schedule suspect (§7.7):

|  | ResNet-18 | Vision transformer |
| --- | --- | --- |
| When the step-size changes | Three times per task | After every mini-batch |
| Does it reach zero? | Never | Decreases until reaching zero |

Units vs weights (thesis Ch. 8):

|  | Selective unit reinitialization | Selective weight reinitialization |
| --- | --- | --- |
| Effect on output | Small | Often large |
| Stability | Not flagged in the conclusion (ReDo with threshold pruning diverged in thesis Ch. 6) | Often unstable |
| Portability | Tailored to each architecture | Any architecture |
| Remedy noted | — | Ameliorated by L2 regularization |

Chapter-by-chapter verdict:

| Thesis chapter | Setting | What it established |
| --- | --- | --- |
| 3 — Fully-connected | Permuted MNIST | Wide range of systems lose plasticity; scale mitigates; L2 and shrink-and-perturb mitigate; correlates without established causal link |
| 4 — Unit reinitialization | Permuted MNIST | Generalizes ReDo and continual backprop; first-order utility needed for Tanh; hemi beats full |
| 5 — Weight reinitialization | Permuted MNIST | SWR equal or better; best is first-order, threshold, resample; open: output impingement, repeated resets |
| 6 — Convolutional | Continual ImageNet | Continual backprop best; threshold pruning unstable; L2 fixes it |
| 7 — Modern architectures | Incremental CIFAR-100 | Prevented in ResNet-18, only mitigated in transformers; schedule suspected |

**Key settings.** CIFAR-100: 100 classes, 500 train and 100 test images each, 32 × 32 × 3; 20 tasks of 5 classes. Preprocessing: ÷255; per-channel normalization; flip p = 0.5; rotation 0–15°; pad 4 and downsample. ResNet-18: SGD momentum 0.9, L2, 200 epochs per task (4,000 total), step-size 0.1 decreased by a factor of 0.2 at epochs 60, 120, 160 (Weiaicunzai, 2022), Kaiming normal, zero biases, γ = 1. Transformer: SGD momentum 0.9, L2, dropout, 100 epochs per task (2,000 total), linear rise over 30 epochs then decay toward zero per mini-batch. log 65 ≈ 4.17.

**Corrections (The Auditor).** "20 classes in total" means 20 tasks. Table A.24's "initial step-size = 0.2" vs 0.1 in Table A.22 and §7.2 (book reads 0.2 as the decay factor; the thesis does not comment). "(7.3)" cited for standard layer norm, but no equation carries that number. "As the number of tasks decreased" should read increased. Figure 7.8a's "Vision ResNet-18" should read ResNet-18. Thesis "decoupled" differs from SGDW.

**Works named.** Krizhevsky and Hinton (2009); Dosovitskiy et al. (2021); Weiaicunzai (2022); Goodfellow et al. (2016); Hyeon-Woo et al. (2023); Chaudhry et al. (2018); Ash and Adams (2020); Elsayed et al. (2024); Lyle et al. (2023); Elsayed and Mahmood (2024); Farias and Jozefiak (2025); Lee et al. (2024); Lewandowski et al. (2025); Sutton (1992); Sharifnassab et al. (2024); Dohare et al. (2024); Hernandez-Garcia et al. (2025); Frankle and Carbin (2019); Liu et al. (2025); Kirkpatrick et al. (2017); Zenke et al. (2017); Aljundi et al. (2018).

**Attribution.** The thesis is © Juan Fernando Hernandez Garcia, 2026, licensed CC BY 4.0, adapted here with credit. Code: github.com/JFernando4/plasticity-via-reinit. All experts and actors in this series are fictional.
