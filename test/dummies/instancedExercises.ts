import EquipmentEntity from '../../src/entities/Equipment.entity';
import ExerciseEntity from '../../src/entities/Exercise.entity';
import MuscleGroupEntity from '../../src/entities/MuscleGroup.entity';
import SerieEntity from '../../src/entities/Serie.entity';
import { supino, roscaDireta, atualizadaRoscaDireta } from './exercises';

export const benchPressExerciseEntity = new ExerciseEntity(supino.exercise);
export const curlExerciseEntity = new ExerciseEntity(roscaDireta.exercise);

export const benchPressSeriesEntity = supino.series.map(
	(serie) => new SerieEntity(serie)
);
export const curlToUpdateSeriesEntity = atualizadaRoscaDireta.series.map(
	(serie) => new SerieEntity(serie)
);

export const curlSeriesEntity = roscaDireta.series.map(
	(serie) => new SerieEntity(serie)
);

export const benchPressEquipmentEntity = new EquipmentEntity(supino.equipment);
export const curlEquipmentEntity = new EquipmentEntity(roscaDireta.equipment);

export const benchPressMuscleGroupEntity = new MuscleGroupEntity(
	supino.muscleGroup
);
export const curlMuscleGroupEntity = new MuscleGroupEntity(
	roscaDireta.muscleGroup
);

export const {
	type: benchPressType,
	date: benchPressDate,
	trainingDay: benchPressTrainingDay,
	observation: benchPressObservation,
} = supino;
export const {
	type: curlType,
	date: curlDate,
	trainingDay: curlTrainingDay,
	observation: curlObservation,
} = roscaDireta;

export const benchPressExerciseToCreate = {
	exercise: benchPressExerciseEntity,
	series: benchPressSeriesEntity,
	equipment: benchPressEquipmentEntity,
	muscleGroup: benchPressMuscleGroupEntity,
	type: benchPressType,
	date: benchPressDate,
	trainingDay: benchPressTrainingDay,
	observation: benchPressObservation,
};

export const curlExerciseToCreate = {
	exercise: curlExerciseEntity,
	series: curlSeriesEntity,
	equipment: curlEquipmentEntity,
	muscleGroup: curlMuscleGroupEntity,
	type: curlType,
	date: curlDate,
	trainingDay: curlTrainingDay,
	observation: curlObservation,
};

export const benchPressExerciseCreated = {
	_id: '6321e977c705e38f871148ce',
	exercise: benchPressExerciseEntity,
	series: benchPressSeriesEntity,
	equipment: benchPressEquipmentEntity,
	muscleGroup: benchPressMuscleGroupEntity,
	type: benchPressType,
	date: benchPressDate,
	trainingDay: benchPressTrainingDay,
	observation: benchPressObservation,
};

export const curlExerciseCreated = {
	_id: '6321e977c705e38f871148cf',
	exercise: curlExerciseEntity,
	series: curlSeriesEntity,
	equipment: curlEquipmentEntity,
	muscleGroup: curlMuscleGroupEntity,
	type: curlType,
	date: curlDate,
	trainingDay: curlTrainingDay,
	observation: curlObservation,
};

export const curlExerciseToUpdate = {
	_id: '6321e977c705e38f871148cf',
	exercise: curlExerciseEntity,
	series: curlToUpdateSeriesEntity,
	equipment: curlEquipmentEntity,
	muscleGroup: curlMuscleGroupEntity,
	type: curlType,
	date: curlDate,
	trainingDay: curlTrainingDay,
	observation: curlObservation,
};

export const allExercisesService = [
	benchPressExerciseToCreate,
	curlExerciseToCreate,
];
