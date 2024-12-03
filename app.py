from flask import Flask, request, jsonify, render_template

path = r"C:\Users\k4t4n\Desktop\GitKatanych\vlads\__pycache__\templates"
app = Flask(__name__, template_folder=path)


# Русские переводы категориальных переменных
categorical_translations = {
    "BusinessTravel": {
        "Non-Travel": "Без поездок",
        "Travel_Rarely": "Редкие поездки",
        "Travel_Frequently": "Частые поездки"
    },
    "Department": {
        "Sales": "Продажи",
        "Research & Development": "Исследования и разработка",
        "Human Resources": "Кадровая служба"
    },
    "EducationField": {
        "Life Sciences": "Биологические науки",
        "Medical": "Медицина",
        "Marketing": "Маркетинг",
        "Technical Degree": "Техническое образование",
        "Other": "Другое",
        "Human Resources": "Кадровое дело"
    },
    "Gender": {
        "Male": "Мужчина",
        "Female": "Женщина"
    },
    "JobRole": {
        "Sales Executive": "Исполнитель по продажам",
        "Research Scientist": "Исследователь-ученый",
        "Laboratory Technician": "Лабораторный техник",
        "Manufacturing Director": "Директор по производству",
        "Healthcare Representative": "Представитель в сфере здравоохранения",
        "Manager": "Менеджер",
        "Sales Representative": "Представитель по продажам",
        "Research Director": "Директор по исследованиям",
        "Human Resources": "Кадры"
    },
    "MaritalStatus": {
        "Single": "Холост/Не замужем",
        "Married": "В браке",
        "Divorced": "В разводе"
    },
    "Over18": {
        "Y": "Да"
    },
    "OverTime": {
        "Yes": "Да",
        "No": "Нет"
    }
}

# Варианты ответов для категориальных переменных
categorical_options = {
    "BusinessTravel": ["Non-Travel", "Travel_Rarely", "Travel_Frequently"],
    "Department": ["Sales", "Research & Development", "Human Resources"],
    "EducationField": ["Life Sciences", "Medical", "Marketing", "Technical Degree", "Other", "Human Resources"],
    "Gender": ["Male", "Female"],
    "JobRole": ["Sales Executive", "Research Scientist", "Laboratory Technician", "Manufacturing Director", "Healthcare Representative", "Manager", "Sales Representative", "Research Director", "Human Resources"],
    "MaritalStatus": ["Single", "Married", "Divorced"],
    "Over18": ["Y"],
    "OverTime": ["Yes", "No"]
}

continuous_variables = [
    "Age",
    "DailyRate",
    "DistanceFromHome",
    "Education",
    "EmployeeCount",
    "EmployeeNumber",
    "EnvironmentSatisfaction",
    "HourlyRate",
    "JobInvolvement",
    "JobLevel",
    "JobSatisfaction",
    "MonthlyIncome",
    "MonthlyRate",
    "NumCompaniesWorked",
    "PercentSalaryHike",
    "PerformanceRating",
    "RelationshipSatisfaction",
    "StandardHours",
    "StockOptionLevel",
    "TotalWorkingYears",
    "TrainingTimesLastYear",
    "WorkLifeBalance",
    "YearsAtCompany",
    "YearsInCurrentRole",
    "YearsSinceLastPromotion",
    "YearsWithCurrManager"
]

# Перечень категориальных переменных
categorical_variables = [
    "BusinessTravel",
    "Department",
    "EducationField",
    "Gender",
    "JobRole",
    "MaritalStatus",
    "Over18",
    "OverTime"
]

@app.route('/', methods=['GET', 'POST'])
def calculate_name_sum():
    if request.method == 'POST':
        data = request.form
        results = {}
        
        # Обработка непрерывных переменных
        for var in continuous_variables:
            value = data.get(var, 0)
            results[var] = value

        # Обработка категориальных переменных
        for var in categorical_variables:
            value = data.get(var, "1")  # Используйте строку "1" по умолчанию
            results[var] = value
        
        print("results:", results)
        print("data:", data)
        # Выполните здесь вашу математическую обработку, если необходимо
        # Например, суммирование значений непрерывных переменных и прочее

        result = 0
        return jsonify(results)

    return render_template('index.html')

if __name__ == '__main__':
    app.run()
