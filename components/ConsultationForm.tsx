"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/TranslationContext";
import { apiRequest } from "@/lib/queryClient";

export default function ConsultationForm() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        hotelSize: "",
        dataProcessing: false,
        marketing: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { toast } = useToast();
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.dataProcessing) {
            toast({
                title: t("error.agreementRequired"),
                description: t("error.agreeToDataProcessing"),
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            await apiRequest("POST", "/api/leads/consultation", formData);

            setIsSuccess(true);
            toast({
                title: t("consultation.successTitle"),
                description: t("consultation.successMessage"),
            });

            // Reset form
            setFormData({
                name: "",
                phone: "",
                hotelSize: "",
                dataProcessing: false,
                marketing: false,
            });

            setTimeout(() => setIsSuccess(false), 5000);
        } catch (error: any) {
            toast({
                title: t("error.submissionFailed"),
                description: error.message || t("error.tryAgainLater"),
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-16 bg-gradient-to-br from-muted/30 to-background">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <Card className="p-8 lg:p-12 shadow-lg">
                        <div className="text-center mb-8">
                            <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-3">
                                {t("consultation.title")}
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                {t("consultation.subtitle")}
                            </p>
                        </div>

                        {isSuccess ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{t("consultation.successTitle")}</h3>
                                <p className="text-muted-foreground">{t("consultation.successMessage")}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-3">
                                    <Label htmlFor="name" className="text-base font-medium">
                                        {t("consultation.name")} *
                                    </Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="h-12 text-base"
                                        placeholder={t("consultation.namePlaceholder")}
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="phone" className="text-base font-medium">
                                        {t("consultation.phone")} *
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="h-12 text-base"
                                        placeholder={t("consultation.phonePlaceholder")}
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="hotelSize" className="text-base font-medium">
                                        {t("consultation.hotelSize")} *
                                    </Label>
                                    <Select
                                        value={formData.hotelSize}
                                        onValueChange={(value) => setFormData({ ...formData, hotelSize: value })}
                                    >
                                        <SelectTrigger className="h-12 text-base">
                                            <SelectValue placeholder={t("consultation.hotelSizePlaceholder")} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="upTo30">{t("roi.size.upTo30")}</SelectItem>
                                            <SelectItem value="upTo100">{t("roi.size.upTo100")}</SelectItem>
                                            <SelectItem value="upTo300">{t("roi.size.upTo300")}</SelectItem>
                                            <SelectItem value="over300">{t("roi.size.over300")}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-4 pt-2">
                                    <div className="flex items-start space-x-3">
                                        <Checkbox
                                            id="dataProcessing"
                                            checked={formData.dataProcessing}
                                            onCheckedChange={(checked) =>
                                                setFormData({ ...formData, dataProcessing: checked as boolean })
                                            }
                                            className="mt-1"
                                        />
                                        <Label htmlFor="dataProcessing" className="text-sm leading-relaxed cursor-pointer">
                                            {t("consultation.dataProcessing")} *
                                        </Label>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Checkbox
                                            id="marketing"
                                            checked={formData.marketing}
                                            onCheckedChange={(checked) =>
                                                setFormData({ ...formData, marketing: checked as boolean })
                                            }
                                            className="mt-1"
                                        />
                                        <Label htmlFor="marketing" className="text-sm leading-relaxed cursor-pointer">
                                            {t("consultation.marketing")}
                                        </Label>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full h-14 text-base font-semibold"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? t("consultation.submitting") : t("consultation.submit")}
                                    {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                                </Button>
                            </form>
                        )}
                    </Card>
                </div>
            </div>
        </section>
    );
}
