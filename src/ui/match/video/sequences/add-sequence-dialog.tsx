import React from 'react';
import { useDispatch } from 'csdm/ui/store/use-dispatch';
import type { Sequence } from 'csdm/common/types/sequence';
import { SequenceDialog } from './sequence-dialog';
import type { DeathNoticesPlayerOptions } from 'csdm/common/types/death-notice-player-options';
import { useCurrentMatchSequences } from './use-current-match-sequences';
import { useCurrentMatch } from 'csdm/ui/match/use-current-match';
import { addSequence } from './sequences-actions';
import type { SequenceForm } from './sequence-form';

type Props = {
  isVisible: boolean;
  closeDialog: () => void;
};

export function AddSequenceDialog({ isVisible, closeDialog }: Props) {
  const match = useCurrentMatch();
  const sequences = useCurrentMatchSequences();
  const dispatch = useDispatch();

  const defaultDeathNotices: DeathNoticesPlayerOptions[] = match.players.map((player) => {
    return {
      steamId: player.steamId,
      playerName: player.name,
      showKill: true,
      highlightKill: false,
    };
  });

  const onSaveClick = (sequenceForm: SequenceForm) => {
    const sequence: Sequence = {
      ...sequenceForm,
      startTick: Number(sequenceForm.startTick),
      endTick: Number(sequenceForm.endTick),
    };
    dispatch(addSequence({ demoFilePath: match.demoFilePath, sequence }));
  };

  const sequenceNumber = sequences.length + 1;
  const lastSequence = sequences.length > 0 ? sequences[sequences.length - 1] : undefined;
  let deathNotices = defaultDeathNotices;
  let playerFocusSteamId: string | undefined;
  if (lastSequence !== undefined) {
    deathNotices = lastSequence.deathNotices;
    playerFocusSteamId = lastSequence.playerFocusSteamId;
  }

  const sequence: Sequence = {
    number: sequenceNumber,
    startTick: 1,
    endTick: Math.round(match.tickrate),
    deathNotices,
    playerFocusSteamId,
  };

  return (
    <SequenceDialog
      initialSequence={sequence}
      isVisible={isVisible}
      closeDialog={closeDialog}
      onSaveClick={onSaveClick}
    />
  );
}
