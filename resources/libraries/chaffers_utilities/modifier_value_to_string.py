def modifier_value_to_string(value):

    if value > 0:
        sign = '+'
    else:
        sign = '-'

    return '{sign}{modifier}'.format(
        sign=sign,
        modifier=value
    )