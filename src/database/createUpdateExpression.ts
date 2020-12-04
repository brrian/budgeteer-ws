interface UpdateExpression {
  ExpressionAttributeValues: ExpressionAttributeValues;
  UpdateExpression: string;
}

interface ExpressionAttributeValues {
  [key: string]: unknown;
}

export default function createUpdateExpression(
  item: Record<string, unknown>,
  omittedKeys: string[] = []
): UpdateExpression {
  const updateExpressions = [];
  const expressionValues: ExpressionAttributeValues = {};

  const omittedKeysSet = new Set(omittedKeys);

  for (const [key, value] of Object.entries(item)) {
    if (omittedKeysSet.has(key)) {
      continue;
    }

    updateExpressions.push(`${key} = :${key}`);
    expressionValues[`:${key}`] = value;
  }

  const updateExpression = `SET ${updateExpressions.join(', ')}`;

  return {
    ExpressionAttributeValues: expressionValues,
    UpdateExpression: updateExpression,
  };
}
